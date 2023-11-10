import { Fragment, ReactNode } from 'react'

import { Box } from '@mui/material'
import type { GetStaticProps } from 'next'

import { IHomePageFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import ContactUs from 'src/sections/ContactUs'
import { getSection } from 'src/sections/getSection'
import TypingAnimation from 'src/sections/TypingAnimation'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

interface HeaderLink {
    slug?: string
    displayName?: string
}

interface Props {
    props: IHomePageFields
    headerLinks?: HeaderLink[]
}

const Page: NextPageWithLayout<Props> = ({ props, headerLinks }) => {
    return (
        <Box
            sx={{
                width: '100%',
                position: 'absolute',
                backgroundColor: '#fff',
                '@keyframes screen': {
                    '0%': {
                        top: 0,
                    },
                    '100%': {
                        top: 'calc(-100vh + 70px)',
                    },
                },
                animation: 'screen 2s 2s forwards',
            }}
        >
            <PageLayout title="Home" menuOptions={headerLinks}>
                <TypingAnimation />
                {props?.section?.map((section) => (
                    <Fragment key={section.sys.id}>{getSection(section)}</Fragment>
                ))}
                <ContactUs />
            </PageLayout>
        </Box>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await ContentService.instance.getHomePageBySlug('home')

    const headerLinks = await ContentService.instance.getHeaderLinks()

    if (!props) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            props: props.fields,
            headerLinks: headerLinks.fields.link?.map((link) => ({
                slug: link.fields.slug,
                displayName: link.fields.displayName,
            })),
        },
    }
}

export default Page
