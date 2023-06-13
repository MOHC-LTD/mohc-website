import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Container, ContainerProps } from '@mui/material'
import ellipse from 'assets/ellipse.png'
import ellipseDarkMode from 'assets/ellipse-darkmode.png'
import { Except } from 'type-fest'

import { Spacing } from 'src/general/utils/config'
import { theme } from 'src/theme/theme.default'

interface SectionProps extends Except<ContainerProps, 'sx'> {
    backgroundColor?: string
    isFullScreen?: boolean
    isDarkMode?: boolean
    hasEllipse?: boolean
}

/**
 * Standard section layout with spacing, background colour and optional ellipse design.
 */
const Section: FunctionComponent<PropsWithChildren<SectionProps>> = ({
    children,
    maxWidth = 'sm',
    isFullScreen = false,
    isDarkMode = false,
    hasEllipse = false,
    fadeType = 'none',
    backgroundColor = theme.palette.background.default,
    ...props
}) => {
    let background = backgroundColor

    switch (fadeType) {
        case 'both': {
            background = `linear-gradient(
                    180deg,
                    ${theme.palette.background.default} 0%,
                    ${backgroundColor} 18.9%,
                    ${backgroundColor} 79.07%,
                    ${theme.palette.background.default} 100%
                )`

            break
        }

        case 'top': {
            background = `linear-gradient(to bottom, transparent, ${backgroundColor})`

            break
        }

        case 'bottom': {
            background = `linear-gradient(to top, transparent, ${backgroundColor})`

            break
        }
    }

    return (
        <Box
            sx={{
                background: background,
            }}
        >
            <Container
                id="container"
                sx={{
                    py: {
                        sm: Spacing.Body / 5,
                        md: Spacing.Body,
                    },
                    [theme.breakpoints.up('md')]: {
                        height: isFullScreen && 'calc(100vh - 72px)',
                    },
                    px: {
                        xl: '140px',
                    },
                }}
                maxWidth={maxWidth === 'xl' ? false : maxWidth}
                {...props}
            >
                {hasEllipse ? (
                    <img
                        alt="Ellipse"
                        src={isDarkMode ? ellipseDarkMode.src : ellipse.src}
                        style={{
                            position: 'absolute',
                            right: isDarkMode ? 'none' : 0,
                            left: isDarkMode ? 0 : 'none',
                            bottom: 0,
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                ) : null}
                {children}
            </Container>
        </Box>
    )
}

export type { SectionProps }

export default Section
