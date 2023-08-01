import { FunctionComponent } from 'react'

import { Box, Button, Drawer, Slide, styled, Typography } from '@mui/material'
import { bindPopover, PopupState } from 'material-ui-popup-state/hooks'
import Link from 'next/link'

import AppName from 'src/general/AppName'
import Icon from 'src/general/Icon'
import { theme } from 'src/theme/theme.default'

interface MenuOptions {
    slug?: string
    displayName?: string
}

interface MobileHeaderDrawerProps {
    state: PopupState
    menuOptions?: MenuOptions[]
    isMobile: boolean
}

const DrawerHeader = styled('div', {
    name: 'DrawerHeader',
})(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2.5, 1),
}))

const MobileHeaderDrawer: FunctionComponent<MobileHeaderDrawerProps> = ({ state, menuOptions, isMobile }) => {
    return (
        <Drawer
            anchor="top"
            transitionDuration={500}
            {...bindPopover(state)}
            PaperProps={{
                sx: {
                    boxShadow: 'none',
                    height: '100%',
                    width: isMobile ? '100%' : '40%',
                    backgroundColor: '#3F69FF',
                },
            }}
            sx={{
                zIndex: 5000,
            }}
        >
            <DrawerHeader>
                <Button
                    onClick={state.close}
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
                in={state.isOpen}
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
                    {menuOptions?.map((option) => (
                        <Link
                            href={`/work/${option.slug}`}
                            onClick={state.close}
                            key={option.displayName}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                paddingBottom: '30px',
                            }}
                        >
                            <Typography variant="h4" color={theme.palette.text.secondary}>
                                {option.displayName}
                            </Typography>
                        </Link>
                    ))}
                </Box>
            </Slide>
        </Drawer>
    )
}

export { MobileHeaderDrawer }
