/* eslint-disable import/group-exports */
export interface CHomePage extends Entry<CosmicHomePage> {
    sys: {
        contentType: {
            sys: {
                id: 'homePage'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export type CONTENT_TYPE =
    | 'accordion'
    | 'accordion-item'
    | 'animated-heading'
    | 'centered-title-and-text'
    | 'device-view'
    | 'full-width-image'
    | 'hero-banner'
    | 'home-page'
    | 'image-and-text'
    | 'image-slider'
    | 'mobile-images-and-text'
    | 'page'
    | 'project-navigation'
    | 'text-column'

export interface CosmicAccordion {
    /** Section ID. */
    section_id?: string | undefined

    /** Slug. */
    slug?: string | undefined

    /** Title. */
    title?: string | undefined

    /** AccordionItem. */
    accordion_item?: any
}

export interface CosmicAccordionItem {
    /** Header. */
    header?: string | undefined

    /** Content. */
    content?: Document | undefined
}

export interface CosmicAnimatedHeading {
    /** Title. */
    title?: string | undefined

    /** Image. */
    image?: Asset | undefined
}

export interface CosmicCenteredTitleAndText {
    /** Section ID. */
    section_id?: string | undefined

    /** Title. */
    title?: string | undefined

    /** Title variant. */
    title_variant?: string | undefined

    /** Text. */
    text?: string | undefined

    /** Text variant. */
    text_variant?: string | undefined

    /** Background color. */
    background_color?: string | undefined
}

export interface CosmicDeviceView {
    /** Section ID. */
    sectionId?: string | undefined

    /** Desktop Image. */
    desktopImage?: Asset | undefined

    /** Mobile Image. */
    mobileImage?: Asset | undefined

    /** Background color. */
    backgroundColor?: string | undefined
}

export type CosmicEntry =
    | CosmicAccordion
    | CosmicAccordionItem
    | CosmicAnimatedHeading
    | CosmicCenteredTitleAndText
    | CosmicDeviceView
    | CosmicFullWidthImage
    | CosmicHeroBanner
    | CosmicHomePage
    | CosmicmageAndText
    | CosmicmageSlider
    | CosmicMobileImagesAndText
    | CosmicPage
    | CosmicProjectNavigation
    | CosmicTextColumn

export interface CosmicFullWidthImage {
    /** Section ID. */
    section_id?: string | undefined

    /** Image. */
    image?: Asset | undefined
}

export interface CosmicHeroBanner {
    /** Title. */
    title?: string | undefined

    /** Subtitle. */
    subtitle?: string | undefined

    /** Image. */
    image?: Asset | undefined

    /** Slug. */
    slug?: string | undefined
}

export interface CosmicHomePage {
    /** Slug. */
    slug?: string | undefined

    metadata?: {
        /** Section. */
        section?: Entry<{ [fieldId: string]: unknown }>[] | undefined
    }
}

export interface CosmicImageAndText {
    /** Section ID. */
    section_id?: string | undefined

    /** Title. */
    title?: string | undefined

    /** Description. */
    description?: string | undefined

    /** Image. */
    image?: Asset | undefined
}

export interface CosmicImageSlider {
    /** Section ID. */
    section_id?: string | undefined

    /** Images. */
    images?: Asset[] | undefined
}

export interface CosmicMobileImagesAndText {
    /** Section ID. */
    section_id?: string | undefined

    /** Title. */
    title?: string | undefined

    /** Description. */
    description?: string | undefined

    /** Images. */
    images?: Asset[] | undefined
}

export interface CosmicPage {
    /** Slug. */
    slug?: string | undefined

    metadata: {
        /** Navigation title. */
        navigation_title?: string | undefined

        /** Navigation image. */
        navigation_image?: Asset | undefined

        /** Section. */
        section?: Entry<{ [fieldId: string]: unknown }>[] | undefined
    }
}

export interface CosmicProjectNavigation {
    /** Project. */
    project?: any
}

export interface CosmicTextColumn {
    /** Section ID. */
    section_id?: string | undefined

    /** Column 1 title. */
    column_1_title?: string | undefined

    /** Column 2 title. */
    column_2_title?: string | undefined

    /** Column 1 content. */
    column_1_content?: Document | undefined

    /** Column 2 content. */
    column_2_content?: Document | undefined
}
