import Cosmic from 'cosmicjs'

const api = Cosmic()

import { config } from 'dotenv'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            COSMIC_BUCKET_SLUG: string
            COSMIC_READ_KEY: string
        }
    }
}

config()

const bucket = process.env.COSMIC_BUCKET_SLUG
    ? api.bucket({
          slug: process.env.COSMIC_BUCKET_SLUG,
          // eslint-disable-next-line camelcase
          read_key: process.env.COSMIC_READ_KEY,
      })
    : null

const getCosmicHomePage: any = async () => {
    return await bucket?.objects
        .find({
            type: 'home-page', // Object Type slug
        })
        .props('title,slug,metadata') // Response properties
}

const getCosmicProject: any = async (slug: string) => {
    return await bucket?.objects
        .find({
            type: 'projects', // Object Type slug
            slug: slug,
        })
        .props('title,slug,metadata') // Response properties
}

const getCosmicProjects: any = async () => {
    return await bucket?.objects
        .find({
            type: 'projects', // Object type
        })
        .props('title,slug,metadata') // Response properties
}

const getCosmicProjectNavigation: any = async () => {
    return await bucket?.objects
        .find({
            type: 'project-navigation',
        })
        .props('title,slug,metadata')
}

export { getCosmicHomePage, getCosmicProject, getCosmicProjectNavigation, getCosmicProjects }
