import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Icon from 'src/general/Icon'
import Section from 'src/general/Section'

const TypingAnimation: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Section maxWidth="xl" isFullScreen>
            <Box
                component="div"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div />
                <Box
                    component="div"
                    sx={{
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <Typography
                        mb={1}
                        align="center"
                        variant="body1"
                        sx={{
                            '@keyframes typing': {
                                '0%': {
                                    border: 'none',
                                    width: 0,
                                },
                                '1%': {
                                    borderRight: '3px solid',
                                    width: 0,
                                },
                                '99%': {
                                    borderRight: '3px solid',
                                    width: '24ch',
                                },
                                '100%': {
                                    width: '24ch',
                                    border: 'none',
                                    display: 'none',
                                },
                            },

                            '@keyframes blink': {
                                '50%': {
                                    borderColor: 'transparent',
                                },
                            },
                            width: 0,
                            animation: 'typing 2s steps(24) forwards, blink .5s step-end 2s infinite alternate',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            fontFamily: 'monospace',
                        }}
                    >
                        {t('home:typing.start')}
                    </Typography>
                </Box>
                <Box
                    component="div"
                    sx={{
                        background: 'transparent !important',
                        '@keyframes bouncey': {
                            '0%': {
                                transform: 'translateY(0)',
                            },
                            '50%': {
                                transform: 'translateY(15px)',
                            },
                            '100%': {
                                transform: 'translateY(0)',
                            },
                        },
                        animation: 'bouncey 1.5s linear infinite',
                    }}
                >
                    <Icon size="large" color="black" name="expand_more" />
                </Box>
            </Box>
        </Section>
    )
}

export default TypingAnimation
