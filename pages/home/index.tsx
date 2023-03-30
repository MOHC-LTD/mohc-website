import { Grid, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import Section from 'src/general/Section'
import { useTranslation } from 'react-i18next'
import type { GetStaticProps } from 'next'

import { NextPageWithLayout } from 'src/types'
import ProjectDrawer from 'src/general/ProjectDrawer'
import ContactUs from 'src/sections/ContactUs'
import PageLayout from 'src/general/PageLayout'
import ContentService from 'src/util/content-service'
import { IHomePageFields, IProjectNavigationFields } from 'src/@types/contentful'
import { getSection } from 'src/sections/getSection'

interface Props {
    props: IHomePageFields
    pages: IProjectNavigationFields
}

const Page: NextPageWithLayout<Props> = ({ props, pages }) => {
    const { t } = useTranslation()

    const menuOptions = props.section
        ?.map((section) => {
            if (section.fields.sectionId) {
                return section.fields.sectionId as string
            }
            return undefined
        })
        .filter((notUndefined) => notUndefined !== undefined) as string[]

    return (
        <PageLayout title="Home" menuOptions={[...menuOptions, 'Our work', 'Contact us']}>
            {props?.section?.map((section) => getSection(section))}
            <Section maxWidth="xl" id="Our work">
                <Typography variant="h3" marginBottom="20px">
                    {t('home:our_work.title')}
                </Typography>
                <Grid container spacing={4}>
                    {pages.project?.map((page) => {
                        let navigationImage: any = page.fields.navigationImage

                        return (
                            <Grid item md={6}>
                                <ProjectDrawer
                                    image={navigationImage?.fields.file.url}
                                    width={navigationImage?.fields.file.details.image?.width}
                                    height={navigationImage?.fields.file.details.image?.height}
                                    title={page.fields.navigationTitle as string}
                                    page={page.fields.slug as string}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Section>
            <ContactUs sectionId="Contact us" />
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await ContentService.instance.getHomePageBySlug('home')
    const pages = await ContentService.instance.getProjectNavigation()

    if (!props) {
        return { notFound: true }
    }

    return {
        props: {
            props: props.fields,
            pages: pages.fields,
        },
    }
}

export default Page
