import { FunctionComponent, useId } from 'react'

import isPropValid from '@emotion/is-prop-valid'
import { AppBar, Box, Button, Stack, styled, Typography } from '@mui/material'
import { usePopupState } from 'material-ui-popup-state/hooks'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import AppName from 'src/general/AppName'
import { ContactUsDrawer } from 'src/general/ContactUsDrawer'
import Icon from 'src/general/Icon'
import { MobileHeaderDrawer } from 'src/general/MobileHeaderDrawer'
import { GeneralConfig, Spacing } from 'src/general/utils/config'
import { theme } from 'src/theme/theme.default'

interface MenuOptions {
    slug?: string
    displayName?: string
}

interface HeaderProps {
    disableStickyShadow?: boolean
    order?: number
    menuOptions?: MenuOptions[]
    color?: string
    isDarkMode?: boolean
}

interface HeaderRootProps {
    order: number
}

const HeaderRoot = styled(AppBar, {
    name: 'HeaderRoot',
    shouldForwardProp: isPropValid,
})<HeaderRootProps>(({ order }) => ({
    boxShadow: theme.shadows[2],
    height: theme.spacing(GeneralConfig.ToolbarHeight),
    backgroundColor: 'rgba(255, 255, 255, 0.6) !important',
    backdropFilter: 'saturate(180%) blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    padding: theme.spacing(0, Spacing.Header),
    top: theme.spacing(GeneralConfig.ToolbarHeight * order),
    zIndex: theme.zIndex.tooltip,
    backfaceVisibility: 'hidden',
}))

const Header: FunctionComponent<HeaderProps> = ({ order = 0, menuOptions, isDarkMode = false }) => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const md = width && width < theme.breakpoints.values.lg

    const drawerPopupState = usePopupState({
        popupId: useId(),
        variant: 'dialog',
    })

    const contactUsDrawerPopupState = usePopupState({
        popupId: useId(),
        variant: 'dialog',
    })

    const contactUsButton = (
        <Button
            color="info"
            variant="contained"
            sx={{
                padding: '5px 15px !important',
                margin: '10px',
                borderRadius: '25px',
                textTransform: 'none',
                color: '#fff !important',
            }}
            onClick={contactUsDrawerPopupState.open}
        >
            <Typography>{t('forms:contact_us.name')}</Typography>
        </Button>
    )

    return (
        <Box>
            <div ref={ref}>
                <HeaderRoot order={order}>
                    <Box
                        display="grid"
                        gap={Spacing.Header}
                        gridTemplateColumns="max-content 1fr max-content"
                        alignItems="center"
                        width={1}
                    >
                        {md ? (
                            <>
                                <Button
                                    variant="text"
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
                                <MobileHeaderDrawer
                                    state={drawerPopupState}
                                    menuOptions={menuOptions}
                                    isMobile={sm || false}
                                />
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
                                {contactUsButton}
                            </>
                        ) : null}
                        {!md ? (
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
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    {menuOptions?.map((option) => (
                                        <Link
                                            key={option.displayName}
                                            href={`/work/${option.slug}`}
                                            onClick={drawerPopupState.close}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                paddingRight: '30px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                color={
                                                    isDarkMode
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.text.primary
                                                }
                                            >
                                                {option.displayName}
                                            </Typography>
                                        </Link>
                                    ))}
                                    {contactUsButton}
                                </Box>
                            </>
                        ) : null}
                        <ContactUsDrawer state={contactUsDrawerPopupState} isMobile={sm || false} />
                    </Box>
                </HeaderRoot>
            </div>
        </Box>
    )
}

export type { HeaderProps }

export { Header }
