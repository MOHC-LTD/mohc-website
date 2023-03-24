import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import TriButton from 'src/interactive/buttons/TriButton'
import Section from '../general/Section'
import Image from 'next/future/image'
import { StaticImageData } from 'next/dist/client/image'
import { theme } from 'src/theme/theme.default'
import { useResizeDetector } from 'react-resize-detector'

interface MobileImagesAndTextProps {
    title: string
    description: string
    images: StaticImageData[]
    buttonText?: string
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const MobileImagesAndText: FunctionComponent<PropsWithChildren<MobileImagesAndTextProps>> = ({
    title,
    description,
    images,
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
                        [theme.breakpoints.up('md')]: { flexDirection: 'row' },
                    }}
                >
                    {sm && (
                        <Typography variant="h3" mb={2}>
                            {title}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex' }}>
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
                                alt={title}
                                src={images[0]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <Image
                                alt="general health"
                                src={images[1]}
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
                            <Image
                                alt={title}
                                src={images[2]}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <Image
                                alt="general health"
                                src={images[3]}
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
                            [theme.breakpoints.up('md')]: { maxWidth: '50%', padding: '0 80px' },
                        }}
                    >
                        {!sm && <Typography variant="h3">{title}</Typography>}
                        <Typography variant="body1">{description}</Typography>
                        {buttonText && <TriButton variant="secondary">{buttonText}</TriButton>}
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default MobileImagesAndText
