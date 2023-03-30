import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
import TextareaField from 'src/form/fields/TextareaField'
import Section from 'src/general/Section'
import TriButton from 'src/interactive/buttons/TriButton'
import { theme } from 'src/theme/theme.default'

interface ContactUsProps {
    sectionId?: string
}

const ContactUs: FunctionComponent<PropsWithChildren<ContactUsProps>> = ({ sectionId }) => {
    const { t } = useTranslation()

    const form = useForm()

    return (
        <Section
            maxWidth="xl"
            isFullScreen
            isDarkMode
            hasEllipse
            backgroundColor={theme.palette.text.primary}
            id={sectionId}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    },
                }}
            >
                <Box
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '40%',
                        },
                    }}
                >
                    <Typography variant="h3" color={theme.palette.text.secondary} marginBottom="20px">
                        {t('home:contact_us.title')}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        {t('home:contact_us.title')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '50%',
                        },
                    }}
                >
                    <FormProvider {...form}>
                        <form>
                            <NameField
                                field={{
                                    label: t('forms:name.label') || undefined,
                                    name: 'name',
                                    required: t('forms:name.required_error') || undefined,
                                    type: 'name',
                                    validation: {
                                        maxLength: 30,
                                    },
                                }}
                            />
                            <EmailField
                                field={{
                                    label: t('forms:email.label') || undefined,
                                    name: 'email',
                                    type: 'email',
                                }}
                            />
                            <TextareaField
                                field={{
                                    label: t('forms:message.label') || undefined,
                                    name: 'message',
                                    required: t('forms:message.required_error') || undefined,
                                    type: 'textarea',
                                }}
                                minRows={10}
                            />
                            <TriButton type="submit">{t('forms:submit')}</TriButton>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
        </Section>
    )
}

export default ContactUs
