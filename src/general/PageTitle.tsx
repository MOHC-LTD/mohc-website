import { FunctionComponent } from 'react'

import Head from 'next/head'

interface PageTitleProps {
    children?: string
}

const PageTitle: FunctionComponent<PageTitleProps> = ({ children }) => {
    return (
        <Head>
            <title>
                {/* Character: &ndash; */}
                {children ?? null}
            </title>
        </Head>
    )
}

export type { PageTitleProps }

export default PageTitle
