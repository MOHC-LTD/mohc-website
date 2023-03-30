import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import TriButton from 'src/interactive/buttons/TriButton'
import Section from '../general/Section'
import { theme } from 'src/theme/theme.default'
import { useResizeDetector } from 'react-resize-detector'
import { Asset } from 'contentful'

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
                            <img
                                alt={images[0].fields.title}
                                src={images[0].fields.file.url}
                                width={images[0].fields.file.details.image?.width}
                                height={images[0].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <img
                                alt={images[1].fields.title}
                                src={images[1].fields.file.url}
                                width={images[1].fields.file.details.image?.width}
                                height={images[1].fields.file.details.image?.height}
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
                                alt={images[2].fields.title}
                                src={images[2].fields.file.url}
                                width={images[2].fields.file.details.image?.width}
                                height={images[2].fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginBottom: '20px',
                                    border: '2px solid lightgrey',
                                    borderRadius: '14px',
                                }}
                            />
                            <img
                                alt={images[3].fields.title}
                                src={images[3].fields.file.url}
                                width={images[3].fields.file.details.image?.width}
                                height={images[3].fields.file.details.image?.height}
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
