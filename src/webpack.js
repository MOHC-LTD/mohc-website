const configureWebpack = (config) => {
    // Allow to target default files directly
    config.resolve.extensions.unshift('.default.tsx', '.default.ts')

    // Allow to omit SVG extensions
    config.resolve.extensions.push('.svg')

    // Add support for SVG files
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })

    return config
}

module.exports = {
    configureWebpack,
}
