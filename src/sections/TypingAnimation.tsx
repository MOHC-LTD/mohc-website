import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

import Icon from 'src/general/Icon'
import Section from 'src/general/Section'

const TypingAnimation: FunctionComponent = () => {
    const { t } = useTranslation()

    const { ref, inView } = useInView()

    return (
        <div ref={ref}>
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
                                    },
                                },

                                '@keyframes blink': {
                                    '50%': {
                                        borderColor: 'transparent',
                                    },
                                },
                                width: 0,
                                animation: inView
                                    ? 'typing 2s steps(24) forwards, blink .5s step-end 2s infinite alternate'
                                    : 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                fontFamily: 'monospace',
                            }}
                        >
                            {t('home:typing.start')}
                        </Typography>
                        <Typography
                            mb={1}
                            align="center"
                            variant="body1"
                            sx={{
                                '@keyframes typing2': {
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
                                        width: '21ch',
                                    },
                                    '100%': {
                                        width: '21ch',
                                        border: 'none',
                                    },
                                },

                                '@keyframes blink2': {
                                    '50%': {
                                        borderColor: 'transparent',
                                    },
                                },
                                width: 0,
                                animation: inView
                                    ? 'typing2 2s steps(21) 2s forwards, blink2 .5s step-end 4s infinite alternate'
                                    : 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                fontFamily: 'monospace',
                            }}
                        >
                            {t('home:typing.list')}
                        </Typography>
                    </Box>
                    <Button
                        onClick={(): void => {
                            const scrollContainer = document.querySelector('#pageLayout')

                            const myElement = document.querySelector('[id="Featured work"]')

                            // @ts-expect-error The property does exist.
                            const topPos = myElement ? myElement.offsetTop : 0

                            if (scrollContainer) {
                                scrollContainer.scrollTop = topPos
                            }
                        }}
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
                    </Button>
                </Box>
            </Section>
        </div>
    )
}

export default TypingAnimation
