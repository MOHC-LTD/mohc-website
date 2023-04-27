import { ReactNode } from 'react'

import type { GetStaticPaths, GetStaticProps } from 'next'

import { IPageFields, IProjectNavigationFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import ContactUs from 'src/sections/ContactUs'
import { getSection } from 'src/sections/getSection'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

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
        <PageLayout
            title={page.navigationTitle}
            menuOptions={[...menuOptions, 'Contact us']}
            color={page?.color}
            isDarkMode={page?.isDarkMode}
        >
            {page.section?.map((section) => getSection(section))}
            <ProjectNavigation pages={pages} />
            <ContactUs sectionId="Contact us" />
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const getStaticPaths: GetStaticPaths = async () => {
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

const getStaticProps: GetStaticProps<Props, { slug: string }> = async (context) => {
    const { slug } = context.params!

    const page = await ContentService.instance.getPageBySlug(slug)

    const pages = await ContentService.instance.getProjectNavigation()

    if (!page) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            page: page.fields,
            pages: pages.fields,
        },
    }
}

export { getStaticPaths, getStaticProps }

export default Page
