import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import TriButton from 'src/interactive/buttons/TriButton'
import Section from '../general/Section'
import { theme } from 'src/theme/theme.default'
import { useResizeDetector } from 'react-resize-detector'
import { Asset } from 'contentful'

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
                        [theme.breakpoints.up('md')]: { flexDirection: 'row' },
                    }}
                >
                    {sm && (
                        <Typography variant="h3" align="center">
                            {title}
                        </Typography>
                    )}
                    <Box sx={{ maxWidth: '100%', [theme.breakpoints.up('md')]: { maxWidth: '50%' } }}>
                        <img
                            alt={image.fields.title}
                            src={image.fields.file.url}
                            width={image.fields.file.details.image?.width}
                            height={image.fields.file.details.image?.height}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            [theme.breakpoints.up('md')]: { maxWidth: '50%', padding: '80px' },
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

export default ImageAndText
