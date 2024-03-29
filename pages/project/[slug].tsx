import { Fragment, ReactNode } from 'react'

import { Box } from '@mui/material'
import is from '@sindresorhus/is'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { getPlaiceholder } from 'plaiceholder'

import { IPageFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import { getSection } from 'src/sections/getSection'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

interface Pages {
    navigationTitle: string
    slug: string
}

interface HeaderLink {
    slug?: string
    displayName?: string
}

interface Props {
    page: IPageFields
    pages: Pages[] | undefined
    headerLinks?: HeaderLink[]
}

const getImagePlaceholderBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url)

    const { base64 } = await getPlaiceholder(Buffer.from(await response.arrayBuffer()))

    return base64
}

const Page: NextPageWithLayout<Props> = ({ page, pages, headerLinks }) => {
    return (
        <PageLayout title={page.navigationTitle} menuOptions={headerLinks}>
            <Box>
                {page.section?.map((section) => (
                    <Fragment key={section.sys.id}>{getSection(section)}</Fragment>
                ))}
            </Box>
            <ProjectNavigation pages={pages} />
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
    const slug = context.params?.slug

    const page = await ContentService.instance.getPageBySlug(slug || '')

    const pages = await ContentService.instance.getEntriesByType<IPageFields>('page')

    const headerLinks = await ContentService.instance.getHeaderLinks()

    if (!page) {
        return {
            notFound: true,
        }
    }

    if (page.fields.section) {
        for await (const section of page.fields.section) {
            if (
                section.fields &&
                section.fields.image &&
                is.plainObject(section.fields.image) &&
                is.plainObject(section.fields.image.fields) &&
                is.plainObject(section.fields.image.fields.file)
            ) {
                const url = `https://${section.fields.image.fields.file.url}`

                section.fields.image.fields.file.placeholder = await getImagePlaceholderBase64(url)
            }
        }
    }

    return {
        props: {
            page: page.fields,
            pages: pages.map((project) => ({
                navigationTitle: project.fields.navigationTitle as string,
                slug: project.fields.slug as string,
            })),
            headerLinks: headerLinks.fields.link?.map((link) => ({
                slug: link.fields.slug,
                displayName: link.fields.displayName,
            })),
        },
    }
}

export { getStaticPaths, getStaticProps }

export default Page
