import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import TriButton from 'src/interactive/buttons/TriButton'
import { theme } from 'src/theme/theme.default'

interface ImageAndTextProps {
    title: string
    description: string
    image: Asset
    buttonText?: string
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const ImageAndText: FunctionComponent<PropsWithChildren<ImageAndTextProps>> = ({
    title,
    description,
    image,
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
                        <Typography variant="h3" align="center">
                            {title}
                        </Typography>
                    ) : null}
                    <Box
                        sx={{
                            maxWidth: '100%',
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '50%',
                            },
                        }}
                    >
                        <img
                            alt={image.fields.title}
                            src={image.fields.file.url}
                            width={image.fields.file.details.image?.width}
                            height={image.fields.file.details.image?.height}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '50%',
                                padding: '80px',
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

export default ImageAndText
