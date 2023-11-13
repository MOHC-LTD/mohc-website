import { ReactNode } from 'react'

import { Entry } from 'contentful'

import {
    IAccordionFields,
    ICenteredTitleAndTextFields,
    IComparisonSliderFields,
    IFullWidthImageFields,
    IFullWidthImageHeaderFields,
    IHeadingFields,
    IImageAndTextFields,
    IImageSliderFields,
    IListFields,
    IMobileImagesAndTextFields,
    IPageNavigationFields,
    IProjectNavigationFields,
    ISmallImageBannerFields,
} from 'src/@types/contentful'
import Accordion from 'src/sections/Accordion'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import ComparisonSlider from 'src/sections/ComparisonSlider'
import FullWidthImage from 'src/sections/FullWidthImage'
import FullWidthImageHeading from 'src/sections/FullWidthImageHeading'
import Heading from 'src/sections/Heading'
import ImageAndText from 'src/sections/ImageAndText'
import ImageSlider from 'src/sections/ImageSlider'
import List from 'src/sections/List'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import PageDisplay from 'src/sections/PageDisplay'
import ProjectDisplay from 'src/sections/ProjectDisplay'
import SmallImageBanner from 'src/sections/SmallImageBanner'
import TextColumn from 'src/sections/TextColumn'

const getSection = (section: Entry<{ [fieldId: string]: unknown }>): ReactNode => {
    switch (section.sys.contentType?.sys.id) {
        case 'accordion': {
            const { title, subtitle, accordionItem, backgroundColor, isDarkMode }: IAccordionFields = section.fields

            return (
                <Accordion
                    title={title}
                    subtitle={subtitle}
                    accordionItem={accordionItem}
                    backgroundColor={backgroundColor}
                    isDarkMode={isDarkMode}
                />
            )
        }

        case 'textColumn': {
            return <TextColumn section={section} />
        }

        case 'fullWidthImage': {
            const {
                backgroundColor,
                backgroundImage,
                fadeType,
                hasBorder,
                isDarkMode,
                title,
                description,
                image,
            }: IFullWidthImageFields = section.fields

            return (
                <FullWidthImage
                    backgroundColor={backgroundColor}
                    backgroundImage={backgroundImage}
                    fadeType={fadeType}
                    hasBorder={hasBorder}
                    isDarkMode={isDarkMode}
                    title={title}
                    description={description}
                    image={image}
                />
            )
        }

        case 'mobileImagesAndText': {
            const {
                title,
                description,
                images,
                sectionId,
                backgroundColor,
                isDarkMode,
                fadeType,
                isInverted,
                hasBorder,
            }: IMobileImagesAndTextFields = section.fields

            return (
                <MobileImagesAndText
                    title={title}
                    description={description}
                    images={images}
                    sectionId={sectionId}
                    backgroundColor={backgroundColor}
                    isDarkMode={isDarkMode}
                    fadeType={fadeType}
                    isInverted={isInverted}
                    hasBorder={hasBorder}
                />
            )
        }

        case 'centeredTitleAndText': {
            const {
                title,
                titleVariant,
                text,
                textVariant,
                backgroundColor,
                isDarkMode,
                isCentered,
            }: ICenteredTitleAndTextFields = section.fields

            return (
                <CenteredTitleAndText
                    title={title}
                    titleVariant={titleVariant}
                    text={text}
                    textVariant={textVariant}
                    backgroundColor={backgroundColor}
                    isDarkMode={isDarkMode}
                    isCentered={isCentered}
                />
            )
        }

        case 'imageAndText': {
            const {
                image,
                title,
                description,
                backgroundColor,
                backgroundImage,
                isDarkMode,
                isAnimated,
                isInverted,
                fadeType,
                hasBorder,
                sectionId,
            }: IImageAndTextFields = section.fields

            return (
                <ImageAndText
                    image={image}
                    title={title}
                    description={description}
                    backgroundColor={backgroundColor}
                    backgroundImage={backgroundImage}
                    isDarkMode={isDarkMode}
                    isAnimated={isAnimated}
                    isInverted={isInverted}
                    fadeType={fadeType}
                    hasBorder={hasBorder}
                    sectionId={sectionId}
                />
            )
        }

        case 'imageSlider': {
            const { images }: IImageSliderFields = section.fields

            return <ImageSlider images={images} />
        }

        case 'heading': {
            const {
                title,
                subtitle,
                sector,
                image,
                color,
                fadeType,
                fontFamily,
                fontStyle,
                fontWeight,
            }: IHeadingFields = section.fields

            return (
                <Heading
                    title={title}
                    subtitle={subtitle}
                    sector={sector}
                    image={image}
                    color={color}
                    fadeType={fadeType}
                    fontFamily={fontFamily}
                    fontStyle={fontStyle}
                    fontWeight={fontWeight}
                />
            )
        }

        case 'fullWidthImageHeader': {
            const { title, image, color, fadeType }: IFullWidthImageHeaderFields = section.fields

            return <FullWidthImageHeading title={title} image={image} color={color} fadeType={fadeType} />
        }

        case 'smallImageBanner': {
            const { images }: ISmallImageBannerFields = section.fields

            return <SmallImageBanner images={images} />
        }

        case 'projectNavigation': {
            const { project, title, sectionId, isCarousel }: IProjectNavigationFields = section.fields

            return <ProjectDisplay project={project} title={title} isCarousel={isCarousel} sectionId={sectionId} />
        }

        case 'pageNavigation': {
            const { pageCard }: IPageNavigationFields = section.fields

            return <PageDisplay pageCard={pageCard} />
        }

        case 'list': {
            const { title, listItems }: IListFields = section.fields

            return <List title={title} listItems={listItems} />
        }

        case 'comparisonSlider': {
            const {
                title,
                sectionId,
                description,
                topImage,
                bottomImage,
                backgroundColor,
                backgroundImage,
                isDarkMode,
                fadeType,
                hasBorder,
            }: IComparisonSliderFields = section.fields

            return (
                <ComparisonSlider
                    title={title}
                    description={description}
                    topImage={topImage}
                    bottomImage={bottomImage}
                    backgroundColor={backgroundColor}
                    backgroundImage={backgroundImage}
                    isDarkMode={isDarkMode}
                    fadeType={fadeType}
                    hasBorder={hasBorder}
                    sectionId={sectionId}
                />
            )
        }

        default: {
            return null
        }
    }
}

export { getSection }
