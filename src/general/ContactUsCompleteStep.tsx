import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Icon from 'src/general/Icon'

const ContactUsCompleteStep: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                component="div"
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80px',
                    height: '100px',
                }}
            >
                <Icon
                    name="drafts"
                    filled={false}
                    size="extra-large"
                    weight={200}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block',
                        '@keyframes mail': {
                            '0%': {
                                opacity: 1,
                            },
                            '40%': {
                                opacity: 0,
                            },
                            '100%': {
                                opacity: 0,
                            },
                        },
                        animation: 'mail 1.5s 1s forwards',
                    }}
                />
                <Icon
                    name="mail"
                    filled={false}
                    size="extra-large"
                    weight={200}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        left: 0,
                        display: 'block',
                        opacity: 0,
                        '@keyframes mail2': {
                            '0%': {
                                top: 5,
                                opacity: 0,
                            },
                            '40%': {
                                top: 5,
                                opacity: 1,
                            },
                            '100%': {
                                top: -180,
                                opacity: 1,
                            },
                        },
                        animation: 'mail2 1.5s 1s forwards',
                    }}
                />
            </Box>
            <Typography
                align="center"
                mb={2}
                variant="h3"
                sx={{
                    opacity: 0,
                    '@keyframes title': {
                        from: {
                            opacity: 0,
                        },
                        to: {
                            opacity: 1,
                        },
                    },
                    animation: 'title 1s 1.5s forwards',
                }}
            >
                {t('forms:contact_us.thank_you_title')}
            </Typography>
            <Typography
                mb={5}
                align="center"
                variant="body1"
                sx={{
                    opacity: 0,
                    '@keyframes subtitle': {
                        from: {
                            opacity: 0,
                        },
                        to: {
                            opacity: 1,
                        },
                    },
                    animation: 'subtitle 1s 2s forwards',
                }}
            >
                {t('forms:contact_us.thank_you_subtitle')}
            </Typography>
        </Box>
    )
}

export { ContactUsCompleteStep }
