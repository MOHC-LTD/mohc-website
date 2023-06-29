const contentfulManagement = require('contentful-management')

import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

module.exports = async () => {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    })

    return contentfulClient
        .getSpace(process.env.CONTENTFUL_SPACE_ID)
        .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
}
