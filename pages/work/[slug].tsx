import { Fragment, ReactNode } from 'react'

import { Box } from '@mui/material'
import is from '@sindresorhus/is'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { getPlaiceholder } from 'plaiceholder'

import { IPageFields, IWorkPageFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import { getSection } from 'src/sections/getSection'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

interface HeaderLink {
    slug?: string
    displayName?: string
}

interface Props {
    page: IPageFields
    headerLinks?: HeaderLink[]
}

const getImagePlaceholderBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url)

    const { base64 } = await getPlaiceholder(Buffer.from(await response.arrayBuffer()))

    return base64
}

const Page: NextPageWithLayout<Props> = ({ page, headerLinks }) => {
    return (
        <PageLayout title={page.navigationTitle} menuOptions={headerLinks}>
            <Box component="div">
                {page.section?.map((section) => (
                    <Fragment key={section.sys.id}>{getSection(section)}</Fragment>
                ))}
            </Box>
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const getStaticPaths: GetStaticPaths = async () => {
    const pages = await ContentService.instance.getEntriesByType<IWorkPageFields>('workPage')

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

    const page = await ContentService.instance.getWorkPageBySlug(slug || '')

    const headerLinks = await ContentService.instance.getHeaderLinks()

    if (!page) {
        return {
            notFound: true,
        }
    }

    if (page.fields.section) {
        for await (const section of page.fields.section) {
            if (
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
            headerLinks: headerLinks.fields.link?.map((link) => ({
                slug: link.fields.slug,
                displayName: link.fields.displayName,
            })),
        },
    }
}

export { getStaticPaths, getStaticProps }

export default Page
