import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import TriButton from 'src/interactive/buttons/TriButton'
import { theme } from 'src/theme/theme.default'

interface MobileImagesAndTextProps {
    title: string
    description: string
    imageURLs: string[]
    buttonText?: string
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const MobileImagesAndText: FunctionComponent<PropsWithChildren<MobileImagesAndTextProps>> = ({
    title,
    description,
    imageURLs,
    buttonText,
    sectionId,
}) => {
    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section maxWidth="xl" id={sectionId}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                        },
                    }}
                >
                    {sm ? (
                        <Typography variant="h3" mb={2}>
                            {title}
                        </Typography>
                    ) : null}
                    <Box
                        sx={{
                            display: 'flex',
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
                            <img
                                alt={imageURLs[0]}
                                src={imageURLs[0]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <img
                                alt={imageURLs[1]}
                                src={imageURLs[1]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
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
                            <img
                                alt={imageURLs[2]}
                                src={imageURLs[2]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <img
                                alt={imageURLs[3]}
                                src={imageURLs[3]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '50%',
                                padding: '0 80px',
                            },
                        }}
                    >
                        {!sm ? <Typography variant="h3">{title}</Typography> : null}
                        <Typography variant="body1">{description}</Typography>
                        {buttonText ? <TriButton variant="secondary">{buttonText}</TriButton> : null}
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default MobileImagesAndText
