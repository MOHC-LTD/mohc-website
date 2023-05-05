import { FunctionComponent } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import i18n from 'i18next'
import { enableMapSet } from 'immer'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { initReactI18next } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { resources } from 'src/translations/resources'
import { NextPageWithLayout } from 'src/types'

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
    <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <QueryClientProvider client={queryClient} contextSharing={true}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AnimatePresence mode={'wait'}>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.75,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    {Component.getLayout ? (
                        Component.getLayout(<Component key={router.pathname} {...pageProps} />, pageProps)
                    ) : (
                        <Component key={router.pathname} {...pageProps} />
                    )}
                </motion.div>
            </AnimatePresence>
        </QueryClientProvider>
    </>
)

export type { CustomAppProps }

export default CustomApp
