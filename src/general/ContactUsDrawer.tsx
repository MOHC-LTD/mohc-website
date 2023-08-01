import { type ReactNode, createContext, FunctionComponent, useCallback, useContext, useMemo, useState } from 'react'

import { Box, Button, Drawer, Typography } from '@mui/material'
import { assert } from '@sindresorhus/is'
import { bindPopover, PopupState } from 'material-ui-popup-state/hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ContactUsCompleteStep } from 'src/general/ContactUsCompleteStep'
import { ContactUsInfoStep } from 'src/general/ContactUsInfoStep'
import { ContactUsProjectStep } from 'src/general/ContactUsProjectStep'
import Icon from 'src/general/Icon'

interface ContactUsDrawerProps {
    state: PopupState
    isMobile: boolean
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

const ContactUsDrawer: FunctionComponent<ContactUsDrawerProps> = ({ state, isMobile }) => {
    const { t } = useTranslation()

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

    return (
        <Drawer
            anchor="right"
            {...bindPopover(state)}
            PaperProps={{
                sx: {
                    boxShadow: 'none',
                    width: isMobile ? '100%' : '40%',
                    backgroundColor: '#fff',
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
                        state.close()

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
                my={isMobile ? 1 : 3}
                mx={isMobile ? 3 : 5}
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
    )
}

export { ContactUsDrawer, useJourney }
