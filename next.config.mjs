import nextBundleAnalyzer from '@next/bundle-analyzer'
import withPlaiceholder from '@plaiceholder/next'

import { configureWebpack } from './src/webpack.js'

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''

let basePath = ''

let isProduction = process.env.ENV === 'dev' ? false : true

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
        legacyBrowsers: false,
    },
    webpack: configureWebpack,
    assetPrefix: assetPrefix,
    basePath: basePath,
    trailingSlash: isProduction,
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(withPlaiceholder(nextConfig))
