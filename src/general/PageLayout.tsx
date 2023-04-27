import { FunctionComponent, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

import Footer from 'src/general/Footer'
import Header from 'src/general/Header'
import PageTitle from 'src/general/PageTitle'

interface PageLayoutProps {
    title?: string
    menuOptions: string[]
    color?: string
    isDarkMode?: boolean
}

/**
 * Standard page layout.
 *
 * Automatically sets the browser's tab title to the page title.
 */
const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({
    title,
    menuOptions,
    color,
    isDarkMode,
    children,
}) => (
    <Box width={1} position="relative">
        {title ? <PageTitle>{title}</PageTitle> : null}
        <Header menuOptions={menuOptions} color={color} isDarkMode={isDarkMode} />
        {children}
        <Footer />
    </Box>
)

export type { PageLayoutProps }

export default PageLayout
