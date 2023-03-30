import { ReactNode } from 'react'

import { Grid, Typography } from '@mui/material'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'

import { IHomePageFields, IProjectNavigationFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'
import ContactUs from 'src/sections/ContactUs'
import { getSection } from 'src/sections/getSection'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

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
                        const navigationImage: any = page.fields.navigationImage

                        return (
                            <Grid item md={6} key={navigationImage?.fields.title}>
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
        return {
            notFound: true,
        }
    }

    return {
        props: {
            props: props.fields,
            pages: pages.fields,
        },
    }
}

export default Page
