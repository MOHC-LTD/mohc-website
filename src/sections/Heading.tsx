import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

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
const Heading: FunctionComponent<PropsWithChildren<HeadingProps>> = ({
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

    return (
        <Section maxWidth="xl" backgroundColor={color} fadeType={fadeType}>
            <Box
                component="div"
                sx={{
                    minHeight: '300px',
                    maxHeight: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
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
                        zIndex: 'snackbar',
                        order: 2,
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '50%',
                            order: 1,
                        },
                    }}
                >
                    <Typography
                        mb={1}
                        variant="h3"
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
                            fontWeight: fontFamily && fontWeight ? fontWeight : '700',
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
                                backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.divider,
                                padding: '8px',
                                margin: '8px',
                            }}
                        >
                            {sector}
                        </Typography>
                    </Box>
                </Box>
                {image ? (
                    <Box
                        component="div"
                        sx={{
                            position: 'relative',
                            maxWidth: '100%',
                            order: 1,
                            [theme.breakpoints.up('md')]: {
                                display: 'flex',
                                height: 'fit-content',
                                maxWidth: '45%',
                                order: 2,
                            },
                        }}
                    >
                        <Image
                            {...('placeholder' in image.fields.file && {
                                blurDataURL: image.fields.file.placeholder as string,
                                placeholder: 'blur',
                            })}
                            alt={image.fields.title}
                            src={`https:${image.fields.file.url}`}
                            width={image.fields.file.details.image?.width}
                            height={image.fields.file.details.image?.height}
                            style={{
                                maxWidth: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </Box>
                ) : null}
            </Box>
        </Section>
    )
}

export default Heading
