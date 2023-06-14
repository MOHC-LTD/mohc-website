import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface HeadingProps {
    title?: string
    subtitle?: string
    sector?: string
    color?: string
}

/**
 * Heading section.
 */
const Heading: FunctionComponent<PropsWithChildren<HeadingProps>> = ({ title, subtitle, sector, color }) => {
    const { t } = useTranslation()

    return (
        <Section maxWidth="xl" backgroundColor={color}>
            <Box
                componenet="div"
                sx={{
                    minHeight: '300px',
                    maxHeight: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        minHeight: '500px',
                    },
                }}
            >
                <Box
                    componenet="div"
                    id="title"
                    sx={{
                        zIndex: 'snackbar',
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '75%',
                        },
                    }}
                >
                    <Typography variant="body1" color="#F8F2EA">
                        {title}
                    </Typography>
                    <Typography variant="h3" color="#F8F2EA">
                        {subtitle}
                    </Typography>
                    <Box
                        componenet="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body1" color="#F8F2EA">
                            {t('general:sector')}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={color}
                            sx={{
                                backgroundColor: '#F8F2EA',
                                padding: '8px',
                                margin: '8px',
                            }}
                        >
                            {sector}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Section>
    )
}

export default Heading
