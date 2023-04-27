import { FunctionComponent, PropsWithChildren, ReactNode, useId } from 'react'

import isPropValid from '@emotion/is-prop-valid'
import { Box, Link, ListItemButton, Stack, styled, Typography } from '@mui/material'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { useResizeDetector } from 'react-resize-detector'

import StuckSentinel from 'src/general/StuckSentinel'
import { GeneralConfig, Spacing } from 'src/general/utils/config'
import { stickyBoxShadow } from 'src/interactive/styles/stickyBoxShadow'
import { theme } from 'src/theme/theme.default'

import AppName from './AppName'

interface HeaderProps {
    disableStickyShadow?: boolean
    order?: number
    menuOptions: string[]
    color?: string
    isDarkMode?: boolean
}

interface HeaderRootProps {
    order: number
    stuck: boolean
}

const HeaderRoot = styled('header', {
    name: 'HeaderRoot',
    shouldForwardProp: isPropValid,
})<HeaderRootProps>(({ theme, order, stuck, color = theme.palette.background.default }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: color,
    color: theme.palette.text.primary,
    position: 'sticky',
    padding: theme.spacing(0, Spacing.Header),
    height: theme.spacing(GeneralConfig.ToolbarHeight),
    top: theme.spacing(GeneralConfig.ToolbarHeight * order),
    zIndex: theme.zIndex.tooltip,
    ...stickyBoxShadow(theme, stuck),
}))

const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = ({
    disableStickyShadow,
    order = 0,
    menuOptions,
    color,
    isDarkMode,
}) => {
    const popupState = usePopupState({
        popupId: useId(),
        variant: 'popover',
    })

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <StuckSentinel position="absolute" top={0}>
                {({ stuck }): ReactNode => (
                    <HeaderRoot order={order} stuck={!!(stuck && !disableStickyShadow)} color={color}>
                        <Box
                            display="grid"
                            gap={Spacing.Header}
                            gridTemplateColumns="max-content 1fr max-content"
                            alignItems="center"
                            width={1}
                        >
                            <Stack spacing={Spacing.Header} direction="row" alignItems="center">
                                <Link href="/home">
                                    <AppName isDarkMode={isDarkMode} />
                                </Link>
                            </Stack>
                            {/* Empty <div> required so that the last section of the grid for
                            location and account can align itself to the right */}
                            <div />
                            {!sm ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    {menuOptions.map((option) => (
                                        <ListItemButton
                                            key={option}
                                            href={`#${option}`}
                                            onClick={popupState.close}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                color={
                                                    isDarkMode
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.text.primary
                                                }
                                            >
                                                {option}
                                            </Typography>
                                        </ListItemButton>
                                    ))}
                                </Box>
                            ) : null}
                        </Box>
                    </HeaderRoot>
                )}
            </StuckSentinel>
        </div>
    )
}

export type { HeaderProps }

export default Header
