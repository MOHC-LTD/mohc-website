import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CustomTypeOptions } from 'react-i18next'

interface GetServerSidePropsWithTranslations {
    (namespaces?: (keyof CustomTypeOptions['resources'])[]): {
        getStaticProps: GetStaticProps
        getStaticPaths: GetStaticPaths
    }
}

const getTranslations: GetServerSidePropsWithTranslations = (namespaces = []) => ({
    getStaticProps: async ({ locale = 'en' }) => ({
        props: {
            ...(await serverSideTranslations(locale, ['general', 'forms', ...namespaces])),
        },
    }),
    getStaticPaths: () => ({
        paths: [],
        fallback: 'blocking',
    }),
})

export { getTranslations }
