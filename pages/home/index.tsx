import { Fragment, ReactNode } from 'react'

import { Box } from '@mui/material'
import type { GetStaticProps } from 'next'

import { IHomePageFields } from 'src/@types/contentful'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import PageLayout from 'src/general/PageLayout'
import { getSection } from 'src/sections/getSection'
import { NextPageWithLayout } from 'src/types'
import ContentService from 'src/util/ContentService'

interface Props {
    props: IHomePageFields
}

const Page: NextPageWithLayout<Props> = ({ props }) => {
    const menuOptions = props.section
        ?.map((section) => {
            if (section.fields.sectionId) {
                return section.fields.sectionId as string
            }

            return undefined
        })
        .filter((notUndefined) => notUndefined !== undefined) as string[]

    return (
        <PageLayout title="Home" menuOptions={[...menuOptions]}>
            <Box component="div">
                {props?.section?.map((section) => (
                    <Fragment key={section.sys.id}>{getSection(section)}</Fragment>
                ))}
            </Box>
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await ContentService.instance.getHomePageBySlug('home')

    if (!props) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            props: props.fields,
        },
    }
}

export default Page
