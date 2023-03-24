const { readFileSync } = require('node:fs')

const path = require('node:path')

const config = JSON.parse(readFileSync(path.resolve('./src/translations/config.json'), 'utf8'))

/** @type {import('next-i18next').UserConfig} */
const i18NextConfig = {
    i18n: config['default'] || config.default,
    defaultNS: 'general',
    react: {
        useSuspense: false,
    },
}

module.exports = i18NextConfig
