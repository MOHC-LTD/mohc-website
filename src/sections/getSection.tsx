import { ReactNode } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { Box, styled, Typography } from '@mui/material'
import { Asset, Entry } from 'contentful'

import {
    IAccordionFields,
    IAccordionItemFields,
    ICenteredTitleAndTextFields,
    IComparisonSliderFields,
    IFullWidthImageFields,
    IFullWidthImageHeaderFields,
    IHeadingFields,
    IImageAndTextFields,
    IImageSliderFields,
    IListFields,
    IListItemFields,
    IMobileImagesAndTextFields,
    IPageNavigationFields,
    IProjectNavigationFields,
    ISmallImageBannerFields,
    ITextColumnFields,
} from 'src/@types/contentful'
import AccordionItem from 'src/general/AccordionItem'
import Section from 'src/general/Section'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import ComparisonSlider from 'src/sections/ComparisonSlider'
import CustomImage from 'src/sections/CustomImage'
import FullWidthImageHeading from 'src/sections/FullWidthImageHeading'
import Heading from 'src/sections/Heading'
import ImageAndText from 'src/sections/ImageAndText'
import ImageSlider from 'src/sections/ImageSlider'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import PageDisplay from 'src/sections/PageDisplay'
import ProjectDisplay from 'src/sections/ProjectDisplay'
import SmallImageBanner from 'src/sections/SmallImageBanner'
import { theme } from 'src/theme/theme.default'

const Accordion = styled('div', {
    name: 'Accordion',
})({
    '& > :not(:last-child)': {
        borderBottom: 'none',
    },

    position: 'relative',
})

const getSection = (section: Entry<{ [fieldId: string]: unknown }>): ReactNode => {
    switch (section.sys.contentType?.sys.id) {
        case 'accordion': {
            const { title, subtitle, accordionItem, backgroundColor, isDarkMode }: IAccordionFields = section.fields

            return (
                <Section maxWidth="xl" backgroundColor={backgroundColor}>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'row',
                            },
                        }}
                    >
                        <Box
                            component="div"
                            mr={5}
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    width: '35%',
                                },
                            }}
                        >
                            <Typography mb={2} variant="h2">
                                {title}
                            </Typography>
                            {subtitle ? documentToReactComponents(subtitle) : null}
                        </Box>
                        <Accordion
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    width: '65%',
                                },
                            }}
                        >
                            {accordionItem?.map((item) => {
                                const { header, content, icon }: IAccordionItemFields = item.fields

                                return (
                                    <AccordionItem key={header} header={header} icon={icon}>
                                        {content ? documentToReactComponents(content) : null}
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </Box>
                </Section>
            )
        }

        case 'textColumn': {
            const { sectionId }: ITextColumnFields = section.fields

            return (
                <Section maxWidth="xl" id={sectionId}>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        {[1, 2].map((number) => {
                            const textColumn: any = section.fields[`textColumn${number}Content`]

                            return !textColumn?.fields.listItems ? (
                                <Box
                                    component="div"
                                    key={number}
                                    sx={{
                                        marginBottom: '20px',
                                        [theme.breakpoints.up('md')]: {
                                            width: '40%',
                                        },
                                    }}
                                >
                                    <Typography variant="h2">
                                        {section.fields[`column${number}Title`] as string}
                                    </Typography>
                                    {documentToReactComponents(textColumn?.fields.textBlock as Document)}
                                </Box>
                            ) : (
                                <Box
                                    component="div"
                                    sx={{
                                        marginBottom: '20px',
                                        [theme.breakpoints.up('md')]: {
                                            width: '40%',
                                        },
                                    }}
                                >
                                    <Typography variant="h2">
                                        {section.fields[`column${number}Title`] as string}
                                    </Typography>
                                    <Box
                                        component="div"
                                        mt={2}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box component="div">
                                            {textColumn?.fields?.listItems?.map((item: any) => (
                                                <Typography mb={2} key={item}>
                                                    {item}
                                                </Typography>
                                            ))}
                                        </Box>
                                        <Box component="div">
                                            {textColumn?.fields?.listItems2?.map((item: any) => (
                                                <Typography mb={2} key={item}>
                                                    {item}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Section>
            )
        }

        case 'fullWidthImage': {
            const {
                backgroundColor,
                backgroundImage,
                fadeType,
                isDarkMode,
                title,
                description,
                image,
            }: IFullWidthImageFields = section.fields

            return (
                <Section
                    maxWidth="xl"
                    backgroundColor={backgroundColor}
                    backgroundImage={backgroundImage as Asset}
                    fadeType={fadeType}
                >
                    <Box
                        component="div"
                        mb={4}
                        sx={{
                            color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '65%',
                            },
                        }}
                    >
                        <Typography variant="h3">{title}</Typography>
                        {description ? documentToReactComponents(description) : null}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {image ? <CustomImage image={image} /> : null}
                    </Box>
                </Section>
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

            return (
                <Section maxWidth="xl">
                    <Typography mb={4} variant="h3">
                        {title as string}
                    </Typography>
                    {listItems ? (
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                maxWidth: '100%',
                                [theme.breakpoints.up('md')]: {
                                    maxWidth: `${100 - (8 - listItems.length) * 12.5}%`,
                                },
                            }}
                        >
                            {listItems?.map((listItem) => {
                                const { title: listItemTitle, subtitle }: IListItemFields = listItem.fields

                                return (
                                    <Box
                                        component="div"
                                        key={listItemTitle}
                                        mb={2}
                                        pr={2}
                                        sx={{
                                            width: '50%',
                                            [theme.breakpoints.up('md')]: {
                                                width: `${100 / (listItems.length / 2)}%`,
                                            },
                                        }}
                                    >
                                        <Typography variant="subtitle2">{listItemTitle}</Typography>
                                        <Typography variant="body1">{subtitle}</Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    ) : null}
                </Section>
            )
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
