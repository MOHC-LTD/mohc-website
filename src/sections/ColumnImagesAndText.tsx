import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { StaticImageData } from 'next/dist/client/image'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface ImageWithDescription {
    image: StaticImageData
    alt: string
    description: string
}

interface ColumnImagesAndTextProps {
    title?: string
    details: ImageWithDescription[]
    sectionId?: string
}

/**
 * Section to display images with description in two columns.
 */
const ColumnImagesAndText: FunctionComponent<PropsWithChildren<ColumnImagesAndTextProps>> = ({
    title,
    details,
    sectionId,
}) => {
    return (
        <Section maxWidth="xl" id={sectionId}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {title ? <Typography variant="h3">{title}</Typography> : null}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            marginBottom: '20px',
                            [theme.breakpoints.up('md')]: {
                                width: '50%',
                                marginRight: '10px',
                            },
                        }}
                    >
                        <img
                            alt={details[0].alt}
                            src={`https:${details[0].image.src}`}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '20px',
                            }}
                        />
                        <Typography variant="body1">{details[0].description}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            [theme.breakpoints.up('md')]: {
                                width: '50%',
                                marginLeft: '10px',
                            },
                        }}
                    >
                        <img
                            alt={details[1].alt}
                            src={`https:${details[1].image.src}`}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '20px',
                            }}
                        />
                        <Typography variant="body1">{details[0].description}</Typography>
                    </Box>
                </Box>
            </Box>
        </Section>
    )
}

export default ColumnImagesAndText
