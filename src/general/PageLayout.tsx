import { FunctionComponent, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

import PageTitle from 'src/general/PageTitle'
import Header from 'src/general/Header'
import Footer from 'src/general/Footer'

interface PageLayoutProps {
    title?: string
    menuOptions: string[]
}

/**
 * Standard page layout.
 *
 * Automatically sets the browser's tab title to the page title.
 */
const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ title, menuOptions, children }) => (
    <Box width={1} position="relative">
        {title ? (
            <>
                <PageTitle>{title}</PageTitle>
            </>
        ) : null}
        <Header menuOptions={menuOptions} />
        {children}
        <Footer />
    </Box>
)

export type { PageLayoutProps }

export default PageLayout
