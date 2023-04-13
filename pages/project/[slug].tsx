import { ReactNode } from 'react'

import type { GetStaticPaths, GetStaticProps } from 'next'

import { IPageFields, IProjectNavigationFields } from 'src/@types/contentful'
import { CosmicPage, CosmicProjectNavigation } from 'src/@types/cosmic'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import ContactUs from 'src/sections/ContactUs'
import { getSection } from 'src/sections/getSection'
import { getSectionCosmic } from 'src/sections/getSectionCosmic'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'
import { getCosmicProject, getCosmicProjectNavigation, getCosmicProjects } from 'src/util/getCosmicEnvironment'

interface Props {
    page: IPageFields | CosmicPage
    pages: IProjectNavigationFields | CosmicProjectNavigation
}

const Page: NextPageWithLayout<Props> = ({ page, pages }) => {
    const fieldType = (page as CosmicPage).metadata !== undefined ? 'metadata' : 'fields'

    const pageSections =
        fieldType === 'metadata' ? (page as CosmicPage).metadata?.section : (page as IPageFields).section

    const pageProjects = fieldType === 'metadata' ? pages : pages.project

    const projects = pageProjects?.map((page) => {
        if (fieldType === 'metadata') {
            return {
                slug: page.slug,
                navigationTitle: page.metadata.navigation_title,
            }
        }

        if (fieldType === 'fields') {
            return {
                slug: page.fields.slug,
                navigationTitle: page.fields.navigationTitle,
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
        <PageLayout title="PLACEHOLDER" menuOptions={[...menuOptions, 'Contact us']}>
            {(page as IPageFields).section
                ? (page as IPageFields).section?.map((section) => getSection(section))
                : null}
            {(page as CosmicPage).metadata
                ? (page as CosmicPage).metadata?.section?.map((section: any) => getSectionCosmic(section))
                : null}
            <ProjectNavigation projects={projects} />
            <ContactUs sectionId="Contact us" />
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const getStaticPaths: GetStaticPaths = async () => {
    const pages = ContentService.instance ? await ContentService.instance.getEntriesByType<IPageFields>('page') : []

    const cosmicPages = (await getCosmicProjects()) || []

    return {
        paths:
            pages?.map((page) => ({
                params: {
                    slug: page.fields.slug,
                },
            })) ||
            cosmicPages.objects.map((page) => ({
                params: {
                    slug: page.slug,
                },
            })),
        fallback: false,
    }
}

const getStaticProps: GetStaticProps<Props, { slug: string }> = async (context) => {
    const { slug } = context.params!

    const page = ContentService.instance ? await ContentService.instance.getPageBySlug(slug) : []

    const pages = ContentService.instance ? await ContentService.instance.getProjectNavigation() : []

    const cosmic = (await getCosmicProject(slug)) || []

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

export { getStaticPaths, getStaticProps }

export default Page
