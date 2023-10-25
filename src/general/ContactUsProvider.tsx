import { createContext, FunctionComponent, useCallback, useContext, useMemo, useState } from 'react'

import { Box, Button } from '@mui/material'
import { assert } from '@sindresorhus/is'
import { PopupState } from 'material-ui-popup-state/hooks'
import { FormProvider, useForm } from 'react-hook-form'

import Icon from 'src/general/Icon'
import { ContactUsStepConfig } from 'src/general/types/contact-us'

interface ContactUsProviderProps {
    state?: PopupState
    steps: ContactUsStepConfig[]
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

const ContactUsProvider: FunctionComponent<ContactUsProviderProps> = ({ state, steps }) => {
    const form = useForm()

    const [currentStep, setCurrentStep] = useState(steps[0])

    const gotoStep = useCallback<GotoStep>(
        (stepId) => {
            const newStep = steps.find((step) => step.id === stepId)

            if (newStep) {
                setCurrentStep(newStep)
            }
        },
        [steps]
    )

    const value = useMemo<ContactUsProviderContextValue>(
        () => ({
            currentStep,
            gotoStep,
        }),
        [currentStep, gotoStep]
    )

    return (
        <JourneyProviderContext.Provider value={value}>
            <FormProvider {...form}>
                <form>
                    {state ? (
                        <Box
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
                    ) : null}
                    {currentStep.renderStep()}
                </form>
            </FormProvider>
        </JourneyProviderContext.Provider>
    )
}

export { ContactUsProvider, useJourney }
