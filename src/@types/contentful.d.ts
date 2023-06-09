// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IAccordionFields {
    /** Section ID */
    sectionId?: string | undefined

    /** slug */
    slug?: string | undefined

    /** Title */
    title?: string | undefined

    /** AccordionItem */
    accordionItem?: Entry<{ [fieldId: string]: unknown }>[] | undefined
}

export interface IAccordion extends Entry<IAccordionFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'accordion'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IAccordionItemFields {
    /** Header */
    header?: string | undefined

    /** Content */
    content?: Document | undefined
}

export interface IAccordionItem extends Entry<IAccordionItemFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'accordionItem'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IAnimatedHeadingFields {
    /** Title */
    title?: string | undefined

    /** Image */
    image?: Asset | undefined
}

export interface IAnimatedHeading extends Entry<IAnimatedHeadingFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'animatedHeading'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface ICenteredTitleAndTextFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Title */
    title?: string | undefined

    /** Title variant */
    titleVariant?: string | undefined

    /** Text */
    text?: string | undefined

    /** Text variant */
    textVariant?: string | undefined

    /** Background color */
    backgroundColor?: string | undefined
}

export interface ICenteredTitleAndText extends Entry<ICenteredTitleAndTextFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'centeredTitleAndText'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IDeviceViewFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Desktop Image */
    desktopImage?: Asset | undefined

    /** Mobile Image */
    mobileImage?: Asset | undefined

    /** Background color */
    backgroundColor?: string | undefined
}

export interface IDeviceView extends Entry<IDeviceViewFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'deviceView'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IFullWidthImageFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Background color */
    backgroundColor?: string | undefined

    /** Fade type */
    fadeType?: 'none' | 'top' | 'bottom' | 'both' | undefined

    /** Image */
    image?: IImage | undefined
}

export interface IFullWidthImage extends Entry<IFullWidthImageFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'fullWidthImage'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IHeadingFields {
    /** Title */
    title?: string | undefined

    /** Subtitle */
    subtitle?: string | undefined

    /** Sector */
    sector?: string | undefined

    /** Image */
    image?: Asset | undefined

    /** Color */
    color?: string | undefined

    /** Fade type */
    fadeType?: 'none' | 'top' | 'bottom' | 'both' | undefined

    /** Is dark mode */
    isDarkMode?: boolean | undefined

    /** Font family */
    fontFamily?: string | undefined

    /** Font style */
    fontStyle?: 'normal' | 'italic' | undefined

    /** Font weight */
    fontWeight?:
        | 'normal'
        | 'bold'
        | 'bolder'
        | 'lighter'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined
}

export interface IHeading extends Entry<IHeadingFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'heading'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IHeroBannerFields {
    /** Title */
    title?: string | undefined

    /** Subtitle */
    subtitle?: string | undefined

    /** Image */
    image?: Asset | undefined

    /** Slug */
    slug?: string | undefined
}

export interface IHeroBanner extends Entry<IHeroBannerFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'heroBanner'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IHomePageFields {
    /** Slug */
    slug?: string | undefined

    /** Section */
    section?: Entry<{ [fieldId: string]: unknown }>[] | undefined
}

export interface IHomePage extends Entry<IHomePageFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'homePage'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IIconBoxFields {
    /** Icon name */
    iconName?: string | undefined

    /** Title */
    title?: string | undefined

    /** Description */
    description?: string | undefined
}

export interface IIconBox extends Entry<IIconBoxFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'iconBox'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IIconBoxesFields {
    /** Title */
    title?: string | undefined

    /** Section ID */
    sectionId?: string | undefined

    /** Color */
    color?: string | undefined

    /** Is dark mode */
    isDarkMode?: boolean | undefined

    /** Icon box */
    iconBox?: IIconBox[] | undefined
}

export interface IIconBoxes extends Entry<IIconBoxesFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'iconBoxes'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IImageFields {
    /** Static Image */
    staticImage?: Asset | undefined

    /** Overlay Image */
    overlayImage?: Asset | undefined
}

export interface IImage extends Entry<IImageFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'image'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IImageAndTextFields {
    /** Title */
    title?: string | undefined

    /** Description */
    description?: string | undefined

    /** Image */
    image?: IImage | undefined

    /** Background color */
    backgroundColor?: string | undefined

    /** Is Dark Mode */
    isDarkMode?: boolean | undefined

    /** Is animated */
    isAnimated?: boolean | undefined

    /** Is inverted */
    isInverted?: boolean | undefined

    /** Fade type */
    fadeType?: 'none' | 'top' | 'bottom' | 'both' | undefined

    /** Section ID */
    sectionId?: string | undefined
}

export interface IImageAndText extends Entry<IImageAndTextFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'imageAndText'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IImageSliderFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Images */
    images?: Asset[] | undefined
}

export interface IImageSlider extends Entry<IImageSliderFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'imageSlider'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IMobileImagesAndTextFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Title */
    title?: string | undefined

    /** Description */
    description?: Document | undefined

    /** Images */
    images?: Asset[] | undefined

    /** Background color */
    backgroundColor?: string | undefined

    /** Fade type */
    fadeType?: 'none' | 'top' | 'bottom' | 'both' | undefined

    /** Is inverted */
    isInverted?: boolean | undefined
}

export interface IMobileImagesAndText extends Entry<IMobileImagesAndTextFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'mobileImagesAndText'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IPageFields {
    /** Navigation title */
    navigationTitle?: string | undefined

    /** Navigation image */
    navigationImage?: Asset | undefined

    /** Navigation description */
    navigationDescription?: string | undefined

    /** slug */
    slug?: string | undefined

    /** Color */
    color?: string | undefined

    /** Is dark mode */
    isDarkMode?: boolean | undefined

    /** section */
    section?: Entry<{ [fieldId: string]: unknown }>[] | undefined
}

export interface IPage extends Entry<IPageFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'page'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface IProjectNavigationFields {
    /** Project */
    project?: Entry<{ [fieldId: string]: unknown }>[] | undefined

    /** Title */
    title?: string | undefined

    /** Footer */
    footer?: string | undefined

    /** Section ID */
    sectionId?: string | undefined
}

/** Add project pages in the order you would like them to appear in the navigation. */

export interface IProjectNavigation extends Entry<IProjectNavigationFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'projectNavigation'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface ISmallImageBannerFields {
    /** Images */
    images?: Asset[] | undefined
}

export interface ISmallImageBanner extends Entry<ISmallImageBannerFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'smallImageBanner'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface ITextColumnFields {
    /** Section ID */
    sectionId?: string | undefined

    /** Column 1 title */
    column1Title?: string | undefined

    /** Column 2 title */
    column2Title?: string | undefined

    /** Column 1 content */
    column1Content?: Document | undefined

    /** Column 2 content */
    column2Content?: Document | undefined

    /** Text Column 1 Content */
    textColumn1Content?: ITextColumnTextBlock | ITextColumnList | undefined

    /** Text Column 2 Content */
    textColumn2Content?: ITextColumnTextBlock | ITextColumnList | undefined
}

export interface ITextColumn extends Entry<ITextColumnFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'textColumn'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface ITextColumnListFields {
    /** List Items */
    listItems?: string[] | undefined

    /** List Items 2 */
    listItems2?: string[] | undefined
}

export interface ITextColumnList extends Entry<ITextColumnListFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'textColumnList'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export interface ITextColumnTextBlockFields {
    /** Text Block */
    textBlock?: Document | undefined
}

export interface ITextColumnTextBlock extends Entry<ITextColumnTextBlockFields> {
    sys: {
        id: string
        type: string
        createdAt: string
        updatedAt: string
        locale: string
        contentType: {
            sys: {
                id: 'textColumnTextBlock'
                linkType: 'ContentType'
                type: 'Link'
            }
        }
    }
}

export type CONTENT_TYPE =
    | 'accordion'
    | 'accordionItem'
    | 'animatedHeading'
    | 'centeredTitleAndText'
    | 'deviceView'
    | 'fullWidthImage'
    | 'heading'
    | 'heroBanner'
    | 'homePage'
    | 'iconBox'
    | 'iconBoxes'
    | 'image'
    | 'imageAndText'
    | 'imageSlider'
    | 'mobileImagesAndText'
    | 'page'
    | 'projectNavigation'
    | 'smallImageBanner'
    | 'textColumn'
    | 'textColumnList'
    | 'textColumnTextBlock'

export type IEntry =
    | IAccordion
    | IAccordionItem
    | IAnimatedHeading
    | ICenteredTitleAndText
    | IDeviceView
    | IFullWidthImage
    | IHeading
    | IHeroBanner
    | IHomePage
    | IIconBox
    | IIconBoxes
    | IImage
    | IImageAndText
    | IImageSlider
    | IMobileImagesAndText
    | IPage
    | IProjectNavigation
    | ISmallImageBanner
    | ITextColumn
    | ITextColumnList
    | ITextColumnTextBlock

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
