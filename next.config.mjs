import nextBundleAnalyzer from '@next/bundle-analyzer'

import { configureWebpack } from './src/webpack.js'

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''

let basePath = ''

if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

    assetPrefix = `/${repo}/`

    basePath = `/${repo}`
}

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    output: 'export',
    reactMode: 'legacy',
    assetPrefix: assetPrefix,
    basePath: basePath,
}

export default nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig)
