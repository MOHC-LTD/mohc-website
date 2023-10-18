import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import { fontFamilyConfig, theme } from 'src/theme/theme.default'

interface HeadingProps {
    title?: string
    subtitle?: string
    sector?: string
    image?: Asset
    color?: string
    fadeType?: string
    isDarkMode?: string
    fontFamily?: string
    fontStyle?: string
    fontWeight?: string
}

/**
 * Heading section.
 */
const Heading: FunctionComponent<HeadingProps> = ({
    title,
    subtitle,
    sector,
    image,
    color,
    fontFamily,
    fontStyle,
    fontWeight,
    fadeType = 'none',
    isDarkMode = false,
}) => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section
                maxWidth="xl"
                isFullScreen={sm ? false : true}
                backgroundColor={color}
                fadeType={fadeType}
                hasMinHeight
            >
                <Box
                    component="div"
                    sx={{
                        minHeight: '300px',
                        maxHeight: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minHeight: '500px',
                        },
                    }}
                >
                    <Box
                        component="div"
                        id="title"
                        mr={2}
                        sx={{
                            order: 2,
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '40%',
                                order: 1,
                            },
                        }}
                    >
                        <Typography
                            mb={1}
                            variant="h1"
                            color={isDarkMode ? theme.palette.background.default : theme.palette.text.primary}
                            sx={{
                                '@keyframes fonts': {
                                    '0%': {
                                        fontFamily: 'baskerville-pt',
                                        fontStyle: 'italic',
                                        width: '100%',
                                    },
                                    '33%': {
                                        width: 0,
                                    },
                                    '66%': {
                                        width: 0,
                                    },
                                    '100%': {
                                        fontFamily: fontFamilyConfig.name,
                                        fontStyle: 'normal',
                                        width: '100%',
                                    },
                                },
                                fontFamily: fontFamily ?? fontFamilyConfig.name,
                                fontStyle: fontFamily && fontStyle ? fontStyle : 'normal',
                                fontWeight: fontFamily && fontWeight ? fontWeight : '500',
                                whiteSpace: fontFamily ? 'nowrap' : 'normal',
                                overflow: fontFamily ? 'hidden' : 'visible',
                                animationName: fontFamily ? 'fonts' : null,
                                animationDuration: '1.5s',
                                animationDelay: '1.5s',
                                animationFillMode: 'forwards',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            mb={1}
                            variant="body1"
                            color={isDarkMode ? theme.palette.background.default : theme.palette.text.primary}
                        >
                            {subtitle}
                        </Typography>
                        {sector ? (
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color={isDarkMode ? theme.palette.background.default : theme.palette.text.primary}
                                >
                                    {t('general:sector')}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color={isDarkMode ? color : theme.palette.text.primary}
                                    sx={{
                                        backgroundColor: isDarkMode
                                            ? theme.palette.background.default
                                            : theme.palette.divider,
                                        padding: '8px',
                                        margin: '8px',
                                    }}
                                >
                                    {sector}
                                </Typography>
                            </Box>
                        ) : null}
                    </Box>
                    {image ? (
                        <Box
                            mb={2}
                            component="div"
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                maxWidth: '100%',
                                order: 1,
                                [theme.breakpoints.up('md')]: {
                                    height: 'fit-content',
                                    justifyContent: 'space-evenly',
                                    maxWidth: '55%',
                                    order: 2,
                                },
                            }}
                        >
                            <video
                                src={`https:${image.fields.file.url}`}
                                autoPlay
                                muted
                                playsInline
                                loop
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: 'calc(100vh - 100px)',
                                    width: 'auto',
                                    height: 'auto',
                                    borderRadius: '16px',
                                }}
                            />
                        </Box>
                    ) : null}
                </Box>
            </Section>
        </div>
    )
}

export default Heading
