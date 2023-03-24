import nextBundleAnalyzer from '@next/bundle-analyzer'

import i18NextConfig from './next-i18next.config.js'
import { configureWebpack } from './src/webpack.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: i18NextConfig.i18n,
    swcMinify: true,
    compiler: {
        reactRemoveProperties: {
            // The regular expressions defined here are processed in Rust so the syntax is different from
            // JavaScript, see https://docs.rs/regex
            properties: ['^data-test', '^data-testid'],
        },
    },
    experimental: {
        esmExternals: true,
        // TODO: remove `legacyBehavior` prop everywhere when this is the default (right now it is required for tests)
        newNextLinkBehavior: true,
        browsersListForSwc: true,
        legacyBrowsers: false,
        modularizeImports: {
            lodash: {
                transform: 'lodash/{{member}}',
            },
        },
    },
    webpack: configureWebpack,
    rewrites: async () => ({
        beforeFiles: [],
        afterFiles: [],
        fallback: [],
    }),
}

export default nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig)
