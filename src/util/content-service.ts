import { createClient } from 'contentful'
import { config } from 'dotenv'
import {
    IAccordionFields,
    IHeroBannerFields,
    IHomePageFields,
    IPageFields,
    IProjectNavigationFields,
} from 'src/@types/contentful'

/*
 * We tell TypeScript that those environment variables are always defined.
 * If you want to learn more about this madness, read:
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONTENTFUL_SPACE_ID: string
            CONTENTFUL_ACCESS_TOKEN: string
        }
    }
}

config()

export default class ContentService {
    static get instance() {
        return new ContentService()
    }

    client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })

    async getEntriesByType<T>(type: string) {
        return (
            await this.client.getEntries<T>({
                content_type: type,
            })
        ).items
    }

    async getHeroBannerBySlug(slug: string) {
        return (
            await this.client.getEntries<IHeroBannerFields>({
                content_type: 'heroBanner',
                'fields.slug': slug,
            })
        ).items[0]
    }

    async getAccordionBySlug(slug: string) {
        return (
            await this.client.getEntries<IAccordionFields>({
                content_type: 'accordion',
                'fields.slug': slug,
            })
        ).items[0]
    }

    async getPageBySlug(slug: string) {
        return (
            await this.client.getEntries<IPageFields>({
                content_type: 'page',
                'fields.slug': slug,
            })
        ).items[0]
    }

    async getHomePageBySlug(slug: string) {
        return (
            await this.client.getEntries<IHomePageFields>({
                content_type: 'homePage',
                'fields.slug': slug,
                include: 3,
            })
        ).items[0]
    }

    async getProjectNavigation() {
        return (
            await this.client.getEntries<IProjectNavigationFields>({
                content_type: 'projectNavigation',
            })
        ).items[0]
    }
}
