import { FunctionComponent, PropsWithChildren, ReactNode, useId } from 'react'

import isPropValid from '@emotion/is-prop-valid'
import { Box, Button, Drawer, ListItemButton, Slide, Stack, styled, Typography } from '@mui/material'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import Link from 'next/link'
import { useResizeDetector } from 'react-resize-detector'

import AppName from 'src/general/AppName'
import Icon from 'src/general/Icon'
import StuckSentinel from 'src/general/StuckSentinel'
import { GeneralConfig, Spacing } from 'src/general/utils/config'
import { stickyBoxShadow } from 'src/interactive/styles/stickyBoxShadow'
import { theme } from 'src/theme/theme.default'

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
})<HeaderRootProps>(({ order, stuck, color = theme.palette.background.default }) => ({
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

const DrawerHeader = styled('div', {
    name: 'DrawerHeader',
})(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2.5, 1),
}))

const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = ({
    disableStickyShadow,
    order = 0,
    menuOptions,
    color,
    isDarkMode = false,
}) => {
    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const drawerPopupState = usePopupState({
        popupId: useId(),
        variant: 'dialog',
    })

    return (
        <div ref={ref}>
            <StuckSentinel position="absolute" top={0}>
                {({ stuck }): ReactNode => (
                    <HeaderRoot order={order} stuck={!!(stuck && !disableStickyShadow)} color={color}>
                        <Box
                            component="div"
                            display="grid"
                            gap={Spacing.Header}
                            gridTemplateColumns="max-content 1fr max-content"
                            alignItems="center"
                            width={1}
                        >
                            {sm ? (
                                <>
                                    <Button
                                        onClick={drawerPopupState.open}
                                        sx={{
                                            padding: '0 !important',
                                        }}
                                    >
                                        <Icon
                                            name="menu"
                                            sx={{
                                                color: isDarkMode
                                                    ? theme.palette.text.secondary
                                                    : theme.palette.text.primary,
                                            }}
                                        />
                                    </Button>
                                    <Drawer
                                        anchor="top"
                                        transitionDuration={500}
                                        {...bindPopover(drawerPopupState)}
                                        PaperProps={{
                                            sx: {
                                                boxShadow: 'none',
                                                height: '100%',
                                                backgroundColor: '#3F69FF',
                                            },
                                        }}
                                        sx={{
                                            zIndex: 5000,
                                        }}
                                    >
                                        <DrawerHeader>
                                            <Button
                                                onClick={drawerPopupState.close}
                                                sx={{
                                                    padding: '0 26px !important',
                                                }}
                                            >
                                                <Icon color={theme.palette.text.secondary} name="close" />
                                            </Button>
                                            <Link
                                                href="/home"
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <AppName isDarkMode={true} />
                                            </Link>
                                        </DrawerHeader>
                                        <Slide
                                            direction="down"
                                            in={drawerPopupState.isOpen}
                                            mountOnEnter
                                            unmountOnExit
                                            timeout={{
                                                enter: 1500,
                                                exit: 300,
                                            }}
                                        >
                                            <Box
                                                component="div"
                                                m={3}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                {menuOptions.map((option) => (
                                                    <Typography
                                                        variant="h4"
                                                        color={theme.palette.text.secondary}
                                                        key={option}
                                                    >
                                                        <ListItemButton
                                                            href={`#${option}`}
                                                            onClick={drawerPopupState.close}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            {option}
                                                        </ListItemButton>
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Slide>
                                    </Drawer>
                                    <Stack spacing={Spacing.Header} direction="row" alignItems="center">
                                        <Link
                                            href="/home"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <AppName isDarkMode={isDarkMode} />
                                        </Link>
                                    </Stack>
                                    {/* Empty <div> required so that the last section of the grid for
                                        location and account can align itself to the right */}
                                    <div />
                                </>
                            ) : null}
                            {!sm ? (
                                <>
                                    <Stack spacing={Spacing.Header} direction="row" alignItems="center">
                                        <Link
                                            href="/home"
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <AppName isDarkMode={isDarkMode} />
                                        </Link>
                                    </Stack>
                                    {/* Empty <div> required so that the last section of the grid for
                                location and account can align itself to the right */}
                                    <div />
                                    <Box
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        {menuOptions.map((option) => (
                                            <ListItemButton
                                                key={option}
                                                href={`#${option}`}
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
                                </>
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
