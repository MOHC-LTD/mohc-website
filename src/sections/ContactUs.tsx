import { FunctionComponent, ReactNode } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ContactUsFooterCompleteStep } from 'src/general/ContactUsFooterCompleteStep'
import { ContactUsFooterInfoStep } from 'src/general/ContactUsFooterInfoStep'
import { ContactUsFooterProjectStep } from 'src/general/ContactUsFooterProjectStep'
import { ContactUsProvider } from 'src/general/ContactUsProvider'
import Section from 'src/general/Section'
import { ContactUsStepConfig } from 'src/general/types/contact-us'
import { theme } from 'src/theme/theme.default'

interface ContactUsProps {
    sectionId?: string
}

const contactUsSteps: ContactUsStepConfig[] = [
    {
        id: 'Info',
        renderStep: (): ReactNode => <ContactUsFooterInfoStep />,
    },
    {
        id: 'Project',
        renderStep: (): ReactNode => <ContactUsFooterProjectStep />,
    },
    {
        id: 'Complete',
        renderStep: (): ReactNode => <ContactUsFooterCompleteStep />,
    },
]

const ContactUs: FunctionComponent<ContactUsProps> = ({ sectionId }) => {
    const { t } = useTranslation()

    return (
        <Section maxWidth="xl" backgroundColor="#3F69FF" id={sectionId}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '350px',
                    },
                }}
            >
                <Box
                    mb={2}
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '40%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Typography variant="h5" color={theme.palette.text.secondary} marginBottom="20px">
                        {t('home:contact_us.title')}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        {t('home:contact_us.subtitle')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        [theme.breakpoints.up('md')]: {
                            width: '50%',
                        },
                    }}
                >
                    <ContactUsProvider steps={contactUsSteps} />
                </Box>
            </Box>
        </Section>
    )
}

export default ContactUs
