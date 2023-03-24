import { FunctionComponent } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { enableMapSet } from 'immer'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import { NextPageWithLayout } from 'src/types'
import { resources } from 'src/translations/resources'
import { AnimatePresence, motion } from 'framer-motion'

interface CustomAppProps extends AppProps {
    Component: NextPageWithLayout
}

enableMapSet()

const queryClient = new QueryClient()

i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: resources,
    },
})

const CustomApp: FunctionComponent<CustomAppProps> = ({ Component, pageProps, router }) => (
    <I18nextProvider i18n={i18n}>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <QueryClientProvider client={queryClient} contextSharing={true}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AnimatePresence mode={'wait'}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.75 }}
                    exit={{ opacity: 0 }}
                >
                    {Component.getLayout ? (
                        Component.getLayout(<Component key={router.pathname} {...pageProps} />, pageProps)
                    ) : (
                        <Component key={router.pathname} {...pageProps} />
                    )}
                </motion.div>
            </AnimatePresence>
        </QueryClientProvider>
    </I18nextProvider>
)

export type { CustomAppProps }

// @ts-expect-error prop types don't matter right now because of inconsistencies in versions
export default appWithTranslation(CustomApp)
