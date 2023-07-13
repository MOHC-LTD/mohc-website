import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import PhoneCanvas from 'src/general/PhoneCanvas'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Heading with image section.
 */
const Banner3D: FunctionComponent = () => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const lg = width && width > theme.breakpoints.values.lg

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section
                maxWidth="xl"
                isFullScreen={sm ? false : true}
                backgroundColor="#E7F2FF"
                fadeType="bottom"
                snap={true}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',

                        alignItems: 'center',
                        height: '100%',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        },
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            order: 2,
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '50%',
                                order: 1,
                            },
                        }}
                    >
                        <Typography variant="h3">{t('home:hero_banner.subtitle')}</Typography>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            order: 1,
                            [theme.breakpoints.up('md')]: {
                                order: 2,
                            },
                        }}
                    >
                        <PhoneCanvas lg={lg as boolean} />
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default Banner3D
