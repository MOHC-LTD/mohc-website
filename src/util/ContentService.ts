/* eslint-disable camelcase */
import { createClient, Entry } from 'contentful'
import { config } from 'dotenv'

import {
    IHeaderLinksFields,
    IHomePageFields,
    IPageFields,
    IProjectNavigationFields,
    IWorkPageFields,
} from 'src/@types/contentful'

declare global {
    interface ProcessEnv {
        CONTENTFUL_SPACE_ID: string
        CONTENTFUL_ACCESS_TOKEN: string
    }
}

config()

export default class ContentService {
    static get instance(): ContentService {
        return new ContentService()
    }

    client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    })

    async getEntriesByType<T>(type: string): Promise<Entry<T>[]> {
        const entries = await this.client.getEntries<T>({
            content_type: type,
        })

        return entries.items
    }

    async getPageBySlug(slug: string): Promise<Entry<IPageFields>> {
        const entries = await this.client.getEntries<IPageFields>({
            content_type: 'page',
            'fields.slug': slug,
            include: 3,
        })

        return entries.items[0]
    }

    async getWorkPageBySlug(slug: string): Promise<Entry<IWorkPageFields>> {
        const entries = await this.client.getEntries<IWorkPageFields>({
            content_type: 'workPage',
            'fields.slug': slug,
            include: 3,
        })

        return entries.items[0]
    }

    async getHomePageBySlug(slug: string): Promise<Entry<IHomePageFields>> {
        const entries = await this.client.getEntries<IHomePageFields>({
            content_type: 'homePage',
            'fields.slug': slug,
            include: 3,
        })

        return entries.items[0]
    }

    async getProjectNavigation(): Promise<Entry<IProjectNavigationFields>> {
        const entries = await this.client.getEntries<IProjectNavigationFields>({
            content_type: 'projectNavigation',
        })

        return entries.items[0]
    }

    async getHeaderLinks(): Promise<Entry<IHeaderLinksFields>> {
        const entries = await this.client.getEntries<IHeaderLinksFields>({
            content_type: 'headerLinks',
            include: 3,
        })

        return entries.items[0]
    }
}
