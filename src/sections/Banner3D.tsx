import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import PhoneCanvas from 'src/general/PhoneCanvas'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Heading with image section.
 */
const Banner3D: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Section maxWidth="xl" isFullScreen backgroundColor="#E7F2FF" fadeType="bottom">
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
                    <PhoneCanvas />
                </Box>
            </Box>
        </Section>
    )
}

export default Banner3D
