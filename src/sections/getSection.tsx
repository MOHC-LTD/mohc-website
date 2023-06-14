import { ReactNode } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { Box, styled, Typography } from '@mui/material'
import { Asset, Entry } from 'contentful'

import { IIconBox, IImage, IProjectNavigationFields } from 'src/@types/contentful'
import AccordionItem from 'src/general/AccordionItem'
import Section from 'src/general/Section'
import { RichTextTypographyVariant } from 'src/rich-text/RichText'
import AnimatedHeading from 'src/sections/AnimatedHeading'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import CustomImage from 'src/sections/CustomImage'
import DeviceView from 'src/sections/DeviceView'
import Heading from 'src/sections/Heading'
import IconBoxes from 'src/sections/IconBoxes'
import ImageAndText from 'src/sections/ImageAndText'
import ImageSlider from 'src/sections/ImageSlider'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
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
    switch (section.sys.contentType.sys.id) {
        case 'animatedHeading': {
            return <AnimatedHeading title={section.fields.title as string} image={section.fields.image as Asset} />
        }

        case 'accordion': {
            const accordionItem: any = section.fields.accordionItem

            return (
                <Section maxWidth="xl">
                    <Typography py={2} variant="h3">
                        {section.fields.title as string}
                    </Typography>
                    <Accordion>
                        {accordionItem?.map((item: any) => (
                            <AccordionItem key={item.fields?.header as string} heading={item.fields?.header as string}>
                                {documentToReactComponents(item.fields?.content)}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Section>
            )
        }

        case 'textColumn': {
            return (
                <Section maxWidth="xl" id={section.fields.sectionId as string}>
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
                        <Box
                            component="div"
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h3">{section.fields.column1Title as string}</Typography>
                            {documentToReactComponents(section.fields.column1Content as Document)}
                        </Box>
                        <Box
                            component="div"
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h3">{section.fields.column2Title as string}</Typography>
                            {documentToReactComponents(section.fields.column2Content as Document)}
                        </Box>
                    </Box>
                </Section>
            )
        }

        case 'fullWidthImage': {
            const image: any = section.fields.image

            return (
                <Section maxWidth="xl">
                    <CustomImage image={image} />
                </Section>
            )
        }

        case 'mobileImagesAndText': {
            return (
                <MobileImagesAndText
                    title={section.fields.title as string}
                    description={section.fields.description as string}
                    images={section.fields.images as Asset[]}
                    sectionId={section.fields.sectionId as string}
                />
            )
        }

        case 'centeredTitleAndText': {
            return (
                <CenteredTitleAndText
                    title={section.fields.title as string}
                    titleVariant={section.fields.titleVariant as RichTextTypographyVariant}
                    text={section.fields.text as string}
                    textVariant={section.fields.textVariant as RichTextTypographyVariant}
                    backgroundColor={section.fields.backgroundColor as string}
                />
            )
        }

        case 'imageAndText': {
            return (
                <ImageAndText
                    image={section.fields.image as IImage}
                    title={section.fields.title as string}
                    description={section.fields.description as string}
                    backgroundColor={section.fields.backgroundColor as string}
                    isDarkMode={section.fields.isDarkMode as boolean}
                    isAnimated={section.fields.isAnimated as boolean}
                    isInverted={section.fields.isInverted as boolean}
                    fadeType={section.fields.fadeType as string}
                    sectionId={section.fields.sectionId as string}
                />
            )
        }

        case 'deviceView': {
            return (
                <DeviceView
                    desktopImage={section.fields.desktopImage as Asset}
                    desktopAlt="Asthma treatments"
                    backgroundColor={section.fields.backgroundColor as string}
                />
            )
        }

        case 'imageSlider': {
            return <ImageSlider images={section.fields.images as Asset[]} />
        }

        case 'iconBoxes': {
            return (
                <IconBoxes
                    title={section.fields.title as string}
                    color={section.fields.color as string}
                    isDarkMode={section.fields.isDarkMode as boolean}
                    boxDetails={section.fields.iconBox as IIconBox[]}
                />
            )
        }

        case 'heading': {
            return (
                <Heading
                    title={section.fields.title as string}
                    subtitle={section.fields.subtitle as string}
                    sector={section.fields.sector as string}
                    color={section.fields.color as string}
                />
            )
        }

        case 'smallImageBanner': {
            return <SmallImageBanner images={section.fields.images as Asset[]} />
        }

        case 'projectNavigation': {
            return <ProjectDisplay project={section.fields as IProjectNavigationFields} />
        }

        default: {
            return null
        }
    }
}

export { getSection }
