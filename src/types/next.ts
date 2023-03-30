import { ReactNode } from 'react'

import { NextPage } from 'next'

type NextPageWithLayout<TProps = unknown> = NextPage<TProps> & {
    getLayout?: (page: ReactNode, pageProps: TProps) => ReactNode
}

interface NextRouterEventHandler {
    (url: string, params: NextRouterEventHandlerParams): void
}

interface NextRouterEventHandlerParams {
    shallow: true
}

export type { NextPageWithLayout, NextRouterEventHandler, NextRouterEventHandlerParams }
