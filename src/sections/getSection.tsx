import { Box, Typography, styled } from '@mui/material'
import { Asset, Entry } from 'contentful'
import { ReactNode } from 'react'
import Section from 'src/general/Section'
import HeadingWithImage from 'src/sections/HeadingWithImage'
import { theme } from 'src/theme/theme.default'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import ImageAndText from 'src/sections/ImageAndText'
import DeviceView from 'src/sections/DeviceView'
import ImageSlider from 'src/sections/ImageSlider'
import AccordionItem from 'src/general/AccordionItem'
import AnimatedHeader from 'src/sections/AnimatedHeading'
import { Document } from '@contentful/rich-text-types'

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
        case 'heroBanner': {
            return (
                <HeadingWithImage
                    title={section.fields.title as string}
                    subtitle={section.fields.subtitle as string}
                    image={section.fields.image as Asset}
                />
            )
        }
        case 'animatedHeading': {
            return <AnimatedHeader title={section.fields.title as string} image={section.fields.image as Asset} />
        }
        case 'accordion': {
            let accordionItem: any = section.fields.accordionItem
            return (
                <Section maxWidth="xl">
                    <Typography variant="h3">{section.fields.title as string}</Typography>
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
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: { flexDirection: 'row', justifyContent: 'space-between' },
                        }}
                    >
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            <Typography variant="h3">{section.fields.column1Title as string}</Typography>
                            {documentToReactComponents(section.fields.column1Content as Document)}
                        </Box>
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            <Typography variant="h3">{section.fields.column2Title as string}</Typography>
                            {documentToReactComponents(section.fields.column2Content as Document)}
                        </Box>
                    </Box>
                </Section>
            )
        }
        case 'fullWidthImage': {
            let image: any = section.fields.image
            return (
                <Section maxWidth="xl">
                    <img
                        alt="Online doctor"
                        src={`https:${image?.fields.file.url}`}
                        width={image?.fields.file.details.image?.width}
                        height={image?.fields.file.details.image?.height}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
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
                    titleVariant={section.fields.titleVariant as string}
                    text={section.fields.text as string}
                    textVariant={section.fields.textVariant as string}
                    backgroundColor={section.fields.backgroundColor as string}
                />
            )
        }
        case 'imageAndText': {
            return (
                <ImageAndText
                    image={section.fields.image as Asset}
                    title={section.fields.title as string}
                    description={section.fields.description as string}
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
    }
}

export { getSection }
