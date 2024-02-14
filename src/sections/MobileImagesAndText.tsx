import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useResizeDetector } from 'react-resize-detector'

import { IMobileImagesAndTextFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Section to display an image and text component.
 */
const MobileImagesAndText: FunctionComponent<IMobileImagesAndTextFields> = ({
    title,
    description,
    images,
    backgroundColor,
    isDarkMode = false,
    fadeType,
    isInverted = false,
    hasBorder,
    sectionId,
}) => {
    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section maxWidth="xl" id={sectionId} backgroundColor={backgroundColor} fadeType={fadeType}>
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                        },
                    }}
                >
                    {images ? (
                        <Box
                            sx={{
                                display: 'flex',
                                [theme.breakpoints.up('md')]: {
                                    order: 2,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '50%',
                                    [theme.breakpoints.up('md')]: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    },
                                }}
                            >
                                <Image
                                    alt={images[0].fields.title}
                                    src={`https:${images[0].fields.file.url}`}
                                    width={images[0].fields.file.details.image?.width}
                                    height={images[0].fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        marginBottom: '20px',
                                        borderRadius: '22px',
                                        border: hasBorder ? '6px solid black' : 'none',
                                    }}
                                />
                                <Image
                                    alt={images[1].fields.title}
                                    src={`https:${images[1].fields.file.url}`}
                                    width={images[1].fields.file.details.image?.width}
                                    height={images[1].fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '22px',
                                        border: hasBorder ? '6px solid black' : 'none',
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    maxWidth: '50%',
                                    marginLeft: '20px',
                                    marginTop: '100px',
                                    [theme.breakpoints.up('md')]: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    },
                                }}
                            >
                                <Image
                                    alt={images[2].fields.title}
                                    src={`https:${images[2].fields.file.url}`}
                                    width={images[2].fields.file.details.image?.width}
                                    height={images[2].fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        marginBottom: '20px',
                                        borderRadius: '22px',
                                        border: hasBorder ? '6px solid black' : 'none',
                                    }}
                                />
                                <Image
                                    alt={images[3].fields.title}
                                    src={`https:${images[3].fields.file.url}`}
                                    width={images[3].fields.file.details.image?.width}
                                    height={images[3].fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '22px',
                                        border: hasBorder ? '6px solid black' : 'none',
                                    }}
                                />
                            </Box>
                        </Box>
                    ) : null}
                    <Box
                        sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                            [theme.breakpoints.up('md')]: {
                                position: 'sticky',
                                top: 70,
                                height: '100%',
                                maxWidth: '50%',
                                padding: isInverted ? '40px 80px 40px 0' : '40px 0 40px 80px',
                                order: isInverted ? 1 : 2,
                            },
                        }}
                    >
                        <Typography variant="h2" mt={sm ? 2 : 0}>
                            {title}
                        </Typography>
                        {description ? documentToReactComponents(description) : null}
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default MobileImagesAndText
