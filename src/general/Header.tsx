import {
    type ReactNode,
    createContext,
    FunctionComponent,
    useCallback,
    useContext,
    useId,
    useMemo,
    useState,
} from 'react'

import isPropValid from '@emotion/is-prop-valid'
import { AppBar, Box, Button, Drawer, ListItemButton, Slide, Stack, styled, Typography } from '@mui/material'
import { assert } from '@sindresorhus/is'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import AppName from 'src/general/AppName'
import { ContactUsCompleteStep } from 'src/general/ContactUsCompleteStep'
import { ContactUsInfoStep } from 'src/general/ContactUsInfoStep'
import { ContactUsProjectStep } from 'src/general/ContactUsProjectStep'
import Icon from 'src/general/Icon'
import { GeneralConfig, Spacing } from 'src/general/utils/config'
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
}

interface ContactUsStepConfig {
    id: string | undefined
    renderStep: () => ReactNode
}

interface ContactUsProviderContextValue {
    currentStep: ContactUsStepConfig
    gotoStep: GotoStep
}

interface GotoStep {
    (stepId: string | undefined): void
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
    color: theme.palette.text.primary,
    padding: theme.spacing(0, Spacing.Header),
    top: theme.spacing(GeneralConfig.ToolbarHeight * order),
    zIndex: theme.zIndex.tooltip,
    backfaceVisibility: 'hidden',
}))

const DrawerHeader = styled('div', {
    name: 'DrawerHeader',
})(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2.5, 1),
}))

const JourneyProviderContext = createContext<ContactUsProviderContextValue | undefined>(undefined)

const useJourney = (): ContactUsProviderContextValue => {
    const value = useContext(JourneyProviderContext)

    assert.plainObject(value)

    return value
}

const contactUsSteps: ContactUsStepConfig[] = [
    {
        id: 'Info',
        renderStep: (): ReactNode => <ContactUsInfoStep />,
    },
    {
        id: 'Project',
        renderStep: (): ReactNode => <ContactUsProjectStep />,
    },
    {
        id: 'Complete',
        renderStep: (): ReactNode => <ContactUsCompleteStep />,
    },
]

const Header: FunctionComponent<HeaderProps> = ({ order = 0, menuOptions, isDarkMode = false }) => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const drawerPopupState = usePopupState({
        popupId: useId(),
        variant: 'dialog',
    })

    const contactUsDrawerPopupState = usePopupState({
        popupId: useId(),
        variant: 'dialog',
    })

    const form = useForm()

    const [currentStep, setCurrentStep] = useState(contactUsSteps[0])

    const gotoStep = useCallback<GotoStep>((stepId) => {
        const newStep = contactUsSteps.find((step) => step.id === stepId)

        if (newStep) {
            setCurrentStep(newStep)
        }
    }, [])

    const value = useMemo<ContactUsProviderContextValue>(
        () => ({
            currentStep,
            gotoStep,
        }),
        [currentStep, gotoStep]
    )

    const contactUsButton = (
        <Button
            color="info"
            variant="contained"
            sx={{
                padding: '5px 10px !important',
                margin: '10px',
                borderRadius: '10px',
                textTransform: 'none',
            }}
            onClick={contactUsDrawerPopupState.open}
        >
            <Typography>{t('forms:contact_us.name')}</Typography>
        </Button>
    )

    return (
        <Box component="div">
            <div ref={ref}>
                <HeaderRoot order={order}>
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
                                {contactUsButton}
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
                                            onClick={drawerPopupState.close}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                backgroundColor: 'transparent !important',
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
                                    {contactUsButton}
                                </Box>
                            </>
                        ) : null}
                        <Drawer
                            anchor="right"
                            {...bindPopover(contactUsDrawerPopupState)}
                            PaperProps={{
                                sx: {
                                    boxShadow: 'none',
                                    width: sm ? '100%' : '40%',
                                    backgroundColor: 'white',
                                },
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {currentStep.id === 'Project' ? (
                                    <Button
                                        onClick={(): void => gotoStep('Info')}
                                        variant="text"
                                        sx={{
                                            padding: '20px !important',
                                            backgroundColor: 'transparent !important',
                                        }}
                                    >
                                        <Icon color="black" name="arrow_back" />
                                    </Button>
                                ) : null}
                                <Button
                                    onClick={(): void => {
                                        contactUsDrawerPopupState.close()

                                        gotoStep('Info')
                                    }}
                                    variant="text"
                                    sx={{
                                        padding: '20px !important',
                                        backgroundColor: 'transparent !important',
                                    }}
                                >
                                    <Icon color="black" name="close" />
                                </Button>
                            </Box>
                            <Box
                                component="div"
                                my={sm ? 1 : 3}
                                mx={sm ? 3 : 5}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <JourneyProviderContext.Provider value={value}>
                                    <FormProvider {...form}>
                                        <form>{currentStep.renderStep()}</form>
                                    </FormProvider>
                                </JourneyProviderContext.Provider>
                                <Typography m={2} variant="caption">
                                    {t('forms:contact_us.email')}
                                </Typography>
                            </Box>
                        </Drawer>
                    </Box>
                </HeaderRoot>
            </div>
        </Box>
    )
}

export type { HeaderProps }

export { Header, useJourney }
