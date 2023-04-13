import { ReactNode } from 'react'

import { Box, styled, Typography } from '@mui/material'

import AccordionItem from 'src/general/AccordionItem'
import Section from 'src/general/Section'
import { RichTextTypographyVariant } from 'src/rich-text/RichText'
import AnimatedHeading from 'src/sections/AnimatedHeading'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import DeviceView from 'src/sections/DeviceView'
import HeadingWithImage from 'src/sections/HeadingWithImage'
import ImageAndText from 'src/sections/ImageAndText'
import ImageSlider from 'src/sections/ImageSlider'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import { theme } from 'src/theme/theme.default'

const Accordion = styled('div', {
    name: 'Accordion',
})({
    '& > :not(:last-child)': {
        borderBottom: 'none',
    },

    position: 'relative',
})

const getSectionCosmic = (section: any): ReactNode => {
    // Console.log(section)

    switch (section.type) {
        case 'heading-with-images': {
            return (
                <HeadingWithImage
                    title={section.metadata.title as string}
                    subtitle={section.metadata.subtitle as string}
                    imageURL={section.metadata.image.url}
                />
            )
        }

        case 'animated-headings': {
            return <AnimatedHeading title={section.metadata.title as string} imageURL={section.metadata.image.url} />
        }

        case 'accordions': {
            const accordionItem: any = section.metadata.accordion_items

            return (
                <Section maxWidth="xl">
                    <Typography variant="h3">{section.metadata.title as string}</Typography>
                    <Accordion>
                        {accordionItem?.map((item: any) => (
                            <AccordionItem
                                key={item.metadata?.header as string}
                                heading={item.metadata?.header as string}
                            >
                                {item.metadata?.content}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Section>
            )
        }

        case 'text-columns': {
            return (
                <Section maxWidth="xl" id={section.metadata.section_id as string}>
                    <Box
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
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h3">{section.metadata.column_1_title as string}</Typography>
                            {section.metadata.column_1_content}
                        </Box>
                        <Box
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h3">{section.metadata.column_2_title as string}</Typography>
                            {section.metadata.column_2_content}
                        </Box>
                    </Box>
                </Section>
            )
        }

        case 'full-width-images': {
            const image: any = section.metadata.image

            return (
                <Section maxWidth="xl">
                    <img
                        alt="Online doctor"
                        src={image?.url}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                </Section>
            )
        }

        case 'mobile-images-and-texts': {
            const imageURLs = section.metadata.images.map((image: any) => {
                return image.image.url
            })

            return (
                <MobileImagesAndText
                    title={section.metadata.title as string}
                    description={section.metadata.description as string}
                    imageURLs={imageURLs}
                    sectionId={section.metadata.section_id as string}
                />
            )
        }

        case 'centered-title-and-texts': {
            return (
                <CenteredTitleAndText
                    title={section.metadata.title as string}
                    titleVariant={section.metadata.title_variant as RichTextTypographyVariant}
                    text={section.metadata.text as string}
                    textVariant={section.metadata.text_variant as RichTextTypographyVariant}
                    backgroundColor={section.metadata.background_color as string}
                />
            )
        }

        case 'image-and-texts': {
            return (
                <ImageAndText
                    imageURL={section.metadata.image.url}
                    title={section.metadata.title as string}
                    description={section.metadata.description as string}
                    sectionId={section.metadata.section_id as string}
                />
            )
        }

        case 'device-views': {
            return (
                <DeviceView
                    desktopImageURL={section.metadata.desktop_image.url}
                    backgroundColor={section.metadata.background_color as string}
                />
            )
        }

        case 'image-sliders': {
            const imageURLs = section.metadata.images.map((image: any) => {
                return image.image.url
            })

            return <ImageSlider imageURLs={imageURLs} />
        }

        default: {
            return null
        }
    }
}

export { getSectionCosmic }
