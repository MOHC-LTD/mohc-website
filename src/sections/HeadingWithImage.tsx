import { FunctionComponent, useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import Image from 'next/image'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface HeadingWithImageProps {
    title?: string
    subtitle?: string
    image?: Asset
}

/**
 * Heading with image section.
 */
const HeadingWithImage: FunctionComponent<HeadingWithImageProps> = ({ title, subtitle, image }) => {
    useEffect(() => {
        const setMargin = (): void => {
            const container = document.querySelector('#container')

            const queryTitle = document.querySelector('#title') as any

            if (queryTitle && container) {
                queryTitle.style.marginLeft = window.getComputedStyle(container).marginLeft
            }
        }

        setMargin()

        window.addEventListener('resize', setMargin)

        return () => {
            window.removeEventListener('resize', setMargin)
        }
    })

    const { width, ref } = useResizeDetector()

    const lg = width && width > theme.breakpoints.values.lg

    return (
        <div ref={ref}>
            <Section maxWidth="xl" isFullScreen>
                <Box
                    sx={{
                        maxHeight: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '50%',
                                height: 'inherit',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        <Image
                            alt={title || ''}
                            src={`https:${image?.fields.file.url}`}
                            width={image?.fields.file.details.image?.width}
                            height={image?.fields.file.details.image?.height}
                            style={{
                                maxWidth: '100%',
                                width: 'auto',
                                maxHeight: '100%',
                                height: 'auto',
                                zIndex: 'modal',
                            }}
                        />
                    </Box>
                    <Box
                        id="title"
                        sx={{
                            zIndex: 'snackbar',
                            [theme.breakpoints.up('md')]: {
                                position: 'absolute',
                                padding: '24px',
                            },
                        }}
                    >
                        <Typography
                            variant={lg ? 'h3' : 'h3'}
                            margin="20px 0"
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    width: '50%',
                                    marginLeft: '50px',
                                },
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            {subtitle}
                        </Typography>
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default HeadingWithImage
