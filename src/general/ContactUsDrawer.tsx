import { FunctionComponent, ReactNode } from 'react'

import { Box, Drawer, Typography } from '@mui/material'
import { bindPopover, PopupState } from 'material-ui-popup-state/hooks'
import { useTranslation } from 'react-i18next'

import { ContactUsCompleteStep } from 'src/general/ContactUsCompleteStep'
import { ContactUsInfoStep } from 'src/general/ContactUsInfoStep'
import { ContactUsProjectStep } from 'src/general/ContactUsProjectStep'
import { ContactUsProvider } from 'src/general/ContactUsProvider'
import { ContactUsStepConfig } from 'src/general/types/contact-us'

interface ContactUsDrawerProps {
    state: PopupState
    isMobile: boolean
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

    // Const { currentStep, gotoStep } = useJourney()

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
                <ContactUsProvider state={state} steps={contactUsSteps} />
                <Typography m={2} variant="caption">
                    {t('forms:contact_us.email')}
                </Typography>
            </Box>
        </Drawer>
    )
}

export { ContactUsDrawer }
