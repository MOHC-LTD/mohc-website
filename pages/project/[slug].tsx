import { ReactNode } from 'react'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import type { GetStaticProps, GetStaticPaths } from 'next'

import { NextPageWithLayout } from 'src/types'
import PageLayout from 'src/general/PageLayout'
import { IPageFields, IProjectNavigationFields } from 'src/@types/contentful'
import ContentService from 'src/util/content-service'
import { getSection } from 'src/sections/getSection'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import ContactUs from 'src/sections/ContactUs'

interface Props {
    page: IPageFields
    pages: IProjectNavigationFields
}

const Page: NextPageWithLayout<Props> = ({ page, pages }) => {
    const menuOptions: string[] = page.section
        ?.map((section) => {
            if (section.fields.sectionId) {
                return section.fields.sectionId
            }
            return undefined
        })
        .filter((notUndefined) => notUndefined !== undefined) as string[]

    return (
        <PageLayout title={page.navigationTitle} menuOptions={[...menuOptions, 'Contact us']}>
            {page.section?.map((section) => getSection(section))}
            <ProjectNavigation pages={pages} />
            <ContactUs sectionId="Contact us" />
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (ctx) => {
    const { slug } = ctx.params!
    const page = await ContentService.instance.getPageBySlug(slug)
    const pages = await ContentService.instance.getProjectNavigation()

    if (!page) {
        return { notFound: true }
    }

    return {
        props: {
            page: page.fields,
            pages: pages.fields,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await ContentService.instance.getEntriesByType<IPageFields>('page')

    return {
        paths: pages.map((page) => ({
            params: {
                slug: page.fields.slug,
            },
        })),
        fallback: false,
    }
}

export default Page
