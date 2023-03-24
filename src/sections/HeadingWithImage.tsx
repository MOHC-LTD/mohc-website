import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'
import Image from 'next/future/image'
import Section from '../general/Section'
import { theme } from 'src/theme/theme.default'
import { StaticImageData } from 'next/dist/client/image'
import { useResizeDetector } from 'react-resize-detector'

interface HeadingWithImageProps {
    title: string
    subtitle: string
    image: StaticImageData
}

/**
 *
 */
const HeadingWithImage: FunctionComponent<PropsWithChildren<HeadingWithImageProps>> = ({ title, subtitle, image }) => {
    useEffect(() => {
        const setMargin = () => {
            const container = document.getElementById('container')

            const title = document.getElementById('title')

            if (title && container) {
                title.style.marginLeft = window.getComputedStyle(container).marginLeft
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
                            alt={title}
                            src={image}
                            style={{
                                maxWidth: '100%',
                                width: 'auto',
                                maxHeight: '100%',
                                height: 'auto',
                                zIndex: 'modal',
                            }}
                            priority
                        />
                    </Box>
                    <Box
                        id="title"
                        sx={{
                            zIndex: 'snackbar',
                            [theme.breakpoints.up('md')]: { position: 'absolute', padding: '24px' },
                        }}
                    >
                        <Typography
                            variant={lg ? 'h1' : 'h3'}
                            margin="20px 0"
                            sx={{ [theme.breakpoints.up('md')]: { width: '65%' } }}
                        >
                            {title}
                        </Typography>
                        <Typography variant="body1" sx={{ [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            {subtitle}
                        </Typography>
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default HeadingWithImage
