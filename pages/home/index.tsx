import { ReactNode } from 'react'

import { Grid, Typography } from '@mui/material'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'

import { IHomePageFields, IProjectNavigationFields } from 'src/@types/contentful'
import { CosmicHomePage, CosmicProjectNavigation } from 'src/@types/cosmic'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'
import ContactUs from 'src/sections/ContactUs'
import { getSection } from 'src/sections/getSection'
import { getSectionCosmic } from 'src/sections/getSectionCosmic'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'
import { getCosmicHomePage, getCosmicProjectNavigation } from 'src/util/getCosmicEnvironment'

interface Props {
    page: IHomePageFields | CosmicHomePage
    pages: IProjectNavigationFields | CosmicProjectNavigation
}

const Page: NextPageWithLayout<Props> = ({ page, pages }) => {
    const { t } = useTranslation()

    const fieldType = (page as CosmicHomePage).metadata !== undefined ? 'metadata' : 'fields'

    const pageSections =
        fieldType === 'metadata' ? (page as CosmicHomePage).metadata?.section : (page as IHomePageFields).section

    const pageProjects = fieldType === 'metadata' ? pages : pages.project

    const projects = pageProjects?.map((page) => {
        if (fieldType === 'metadata') {
            return {
                slug: page.slug,
                navigationTitle: page.metadata.navigation_title,
                navigationImage: page.metadata.navigation_image.url,
            }
        }

        if (fieldType === 'fields') {
            return {
                slug: page.fields.slug,
                navigationTitle: page.fields.navigationTitle,
                navigationImage: page.fields.navigationImage.fields.file.url,
            }
        }

        return null
    })

    const menuOptions =
        (pageSections
            ?.map((section) => {
                if (section[fieldType].sectionId) {
                    return section[fieldType].sectionId as string
                } else if (section[fieldType].section_id) {
                    return section[fieldType].section_id
                }

                return undefined
            })
            .filter((notUndefined) => notUndefined !== undefined) as string[]) || []

    return (
        <PageLayout title="Home" menuOptions={[...menuOptions, 'Our work', 'Contact us']}>
            {(page as IHomePageFields).section
                ? (page as IHomePageFields).section?.map((section) => getSection(section))
                : null}
            {(page as CosmicHomePage).metadata
                ? (page as CosmicHomePage).metadata?.section?.map((section: any) => getSectionCosmic(section))
                : null}
            <Section maxWidth="xl" id="Our work">
                <Typography variant="h3" marginBottom="20px">
                    {t('home:our_work.title')}
                </Typography>
                <Grid container spacing={4}>
                    {projects?.map((page) => {
                        return (
                            <Grid item md={6} key={page.navigationTitle}>
                                <ProjectDrawer
                                    image={page.navigationImage}
                                    title={page.navigationTitle}
                                    page={page.slug}
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
    const page = ContentService.instance ? await ContentService.instance.getHomePageBySlug('home') : []

    const pages = await ContentService.instance.getProjectNavigation()

    const cosmic = (await getCosmicHomePage()) || []

    const cosmicPages = (await getCosmicProjectNavigation()) || []

    if (!page && !cosmic) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            page: page?.fields || cosmic?.objects[0],
            pages: pages?.fields || cosmicPages.objects[0].metadata.projects,
        },
    }
}

export default Page
