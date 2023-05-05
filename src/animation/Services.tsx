import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'
import { animated, useSpring } from 'react-spring'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * TODO.
 */
const Services: FunctionComponent = () => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const springLeft = useSpring({
        loop: true,
        from: {
            left: '120%',
        },
        to: {
            left: '-20%',
        },
        config: {
            duration: 3000,
        },
    })

    const springRight = useSpring({
        loop: true,
        from: {
            left: '-20%',
        },
        to: {
            left: '120%',
        },
        config: {
            duration: 3000,
        },
    })

    const springDown = useSpring({
        loop: true,
        from: {
            top: '120%',
        },
        to: {
            top: '-20%',
        },
        config: {
            duration: 3000,
        },
    })

    const springUp = useSpring({
        loop: true,
        from: {
            top: '-20%',
        },
        to: {
            top: '120%',
        },
        config: {
            duration: 3000,
        },
    })

    return (
        <div ref={ref}>
            <Section maxWidth="xl" id="Services">
                <Box
                    sx={{
                        marginBottom: '50px',
                    }}
                >
                    <Typography variant="h2" marginBottom="20px">
                        {t('home:services.title')}
                    </Typography>
                    <Typography variant="body1">{t('home:services.subtitle')}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Box
                        sx={{
                            background: theme.palette.background.default,
                            border: '3px dashed black',
                            borderRadius: '50%',
                            width: '300px',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 'appBar',
                            [theme.breakpoints.up('md')]: {
                                width: '200px',
                                height: '200px',
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: '300px',
                                height: '300px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: '400px',
                                height: '400px',
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            {t('home:services.shopify')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            border: '1px black',
                            borderStyle: 'none solid',
                            width: '100px',
                            height: '100px',
                            position: 'relative',
                            zIndex: 'fab',
                            [theme.breakpoints.up('md')]: {
                                borderStyle: 'solid none',
                                width: '70px',
                                height: '70px',
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: '100px',
                                height: '80px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: '150px',
                                height: '100px',
                            },
                        }}
                    >
                        <animated.div
                            style={{
                                position: 'absolute',
                                top: sm ? 0 : -10,
                                left: sm ? -10 : 0,
                                width: 0,
                                height: 0,
                                borderLeft: sm ? '10px solid transparent' : 'none',
                                borderRight: sm ? '10px solid transparent' : '10px solid black',
                                borderTop: sm ? '10px solid black' : '10px solid transparent',
                                borderBottom: sm ? 'none' : '10px solid transparent',
                                zIndex: 'fab',
                                ...(sm ? springUp : springLeft),
                            }}
                        />
                        <animated.div
                            style={{
                                position: 'absolute',
                                bottom: sm ? 0 : -10,
                                right: sm ? -10 : 0,
                                width: 0,
                                height: 0,
                                borderLeft: sm ? '10px solid transparent' : '10px solid black',
                                borderRight: sm ? '10px solid transparent' : 'none',
                                borderTop: sm ? 'none' : '10px solid transparent',
                                borderBottom: sm ? '10px solid black' : '10px solid transparent',
                                zIndex: 'fab',
                                ...(sm ? springDown : springRight),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            background: 'black',
                            borderRadius: '50%',
                            width: '200px',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 'appBar',
                            [theme.breakpoints.up('md')]: {
                                width: '180px',
                                height: '180px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: '200px',
                                height: '200px',
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                            }}
                            color={theme.palette.text.secondary}
                        >
                            {t('home:services.integration')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            border: '1px black',
                            borderStyle: 'none solid',
                            width: '100px',
                            height: '100px',
                            position: 'relative',
                            zIndex: 'fab',
                            [theme.breakpoints.up('md')]: {
                                borderStyle: 'solid none',
                                width: '70px',
                                height: '70px',
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: '100px',
                                height: '80px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: '150px',
                                height: '100px',
                            },
                        }}
                    >
                        <animated.div
                            style={{
                                position: 'absolute',
                                top: sm ? 0 : -10,
                                left: sm ? -10 : 0,
                                width: 0,
                                height: 0,
                                borderLeft: sm ? '10px solid transparent' : 'none',
                                borderRight: sm ? '10px solid transparent' : '10px solid black',
                                borderTop: sm ? '10px solid black' : '10px solid transparent',
                                borderBottom: sm ? 'none' : '10px solid transparent',
                                zIndex: 'fab',
                                ...(sm ? springUp : springLeft),
                            }}
                        />
                        <animated.div
                            style={{
                                position: 'absolute',
                                bottom: sm ? 0 : -10,
                                right: sm ? -10 : 0,
                                width: 0,
                                height: 0,
                                borderLeft: sm ? '10px solid transparent' : '10px solid black',
                                borderRight: sm ? '10px solid transparent' : 'none',
                                borderTop: sm ? 'none' : '10px solid transparent',
                                borderBottom: sm ? '10px solid black' : '10px solid transparent',
                                ...(sm ? springDown : springRight),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            background: theme.palette.background.default,
                            border: '3px solid black',
                            borderRadius: '50%',
                            width: '250px',
                            height: '250px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 'appBar',
                            [theme.breakpoints.up('md')]: {
                                width: '200px',
                                height: '200px',
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: '250px',
                                height: '250px',
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: '300px',
                                height: '300px',
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            {t('home:services.business')}
                        </Typography>
                    </Box>
                </Box>
            </Section>
        </div>
    )
}

export default Services
