import { ReactNode } from 'react'

import { NextApiRequest, NextPage } from 'next'
import { Opaque } from 'type-fest'

type NextPageWithLayout<TProps = unknown> = NextPage<TProps> & {
    getLayout?: (page: ReactNode, pageProps: TProps) => ReactNode
}

type QueryParamValue = string | string[] | Opaque<string, unknown>

type QueryParams = Record<string, QueryParamValue> | QueryParamValue

type NextApiRequestWithQueryParams<T extends QueryParams> = NextApiRequest & {
    query: T
}

interface NextRouterEventHandler {
    (url: string, params: NextRouterEventHandlerParams): void
}

interface NextRouterEventHandlerParams {
    shallow: true
}

export type { NextApiRequestWithQueryParams, NextPageWithLayout, NextRouterEventHandler, NextRouterEventHandlerParams }
