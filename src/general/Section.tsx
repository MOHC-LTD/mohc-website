import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Container, ContainerProps } from '@mui/material'
import { Except } from 'type-fest'

import { Spacing } from 'src/general/utils/config'
import { theme } from 'src/theme/theme.default'
import ellipse from 'assets/ellipse.png'
import ellipseDarkMode from 'assets/ellipse-darkmode.png'
import Image from 'next/future/image'

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
    backgroundColor = theme.palette.background.default,
    ...props
}) => {
    return (
        <Box
            sx={{
                background: backgroundColor,
            }}
        >
            <Container
                id="container"
                sx={{
                    py: {
                        sm: Spacing.Body / 3,
                        md: Spacing.Body,
                    },
                    [theme.breakpoints.up('md')]: { height: isFullScreen && 'calc(100vh - 72px)' },
                }}
                maxWidth={maxWidth}
                {...props}
            >
                {hasEllipse && (
                    <Image
                        alt="Ellipse"
                        src={isDarkMode ? ellipseDarkMode : ellipse}
                        style={{
                            position: 'absolute',
                            right: isDarkMode ? 'none' : 0,
                            left: isDarkMode ? 0 : 'none',
                            bottom: 0,
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                )}
                {children}
            </Container>
        </Box>
    )
}

export type { SectionProps }

export default Section
