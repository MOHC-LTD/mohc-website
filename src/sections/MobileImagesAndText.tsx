import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import TriButton from 'src/interactive/buttons/TriButton'
import { theme } from 'src/theme/theme.default'

interface MobileImagesAndTextProps {
    title: string
    description: string
    images: Asset[]
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
                        position: 'relative',
                        overflow: 'visible',
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
                                alt={images[0].fields.title}
                                src={`https:${images[0].fields.file.url}`}
                                width={images[0].fields.file.details.image?.width}
                                height={images[0].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                }}
                            />
                            <img
                                alt={images[1].fields.title}
                                src={`https:${images[1].fields.file.url}`}
                                width={images[1].fields.file.details.image?.width}
                                height={images[1].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
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
                                alt={images[2].fields.title}
                                src={`https:${images[2].fields.file.url}`}
                                width={images[2].fields.file.details.image?.width}
                                height={images[2].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                }}
                            />
                            <img
                                alt={images[3].fields.title}
                                src={`https:${images[3].fields.file.url}`}
                                width={images[3].fields.file.details.image?.width}
                                height={images[3].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
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
                                position: 'sticky',
                                top: 0,
                                height: '100%',
                                maxWidth: '50%',
                                padding: '40px 80px',
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
