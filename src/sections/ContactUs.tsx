import { FunctionComponent, PropsWithChildren } from 'react'
import Section from 'src/general/Section'
import { Alert, Box, Typography } from '@mui/material'
import { theme } from 'src/theme/theme.default'
import { useTranslation } from 'react-i18next'
import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
import TextareaField from 'src/form/fields/TextareaField'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import TriButton from 'src/interactive/buttons/TriButton'
import axios from 'axios'

interface ContactUsProps {
    sectionId?: string
}

const ContactUs: FunctionComponent<PropsWithChildren<ContactUsProps>> = ({ sectionId }) => {
    const { t } = useTranslation()

    const { handleSubmit } = useForm()

    const { mutate, isLoading, isError } = useMutation(async (data) => axios.post('url', data))

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
                    [theme.breakpoints.up('md')]: { flexDirection: 'row', justifyContent: 'space-between' },
                }}
            >
                <Box sx={{ [theme.breakpoints.up('md')]: { maxWidth: '40%' } }}>
                    <Typography variant="h3" color={theme.palette.text.secondary} marginBottom="20px">
                        {t('home:contact_us.title')}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        {t('home:contact_us.title')}
                    </Typography>
                </Box>
                <Box sx={{ [theme.breakpoints.up('md')]: { maxWidth: '50%' } }}>
                    <FormProvider {...form}>
                        {/* @ts-ignore */}
                        <form onSubmit={handleSubmit(mutate)}>
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
                            {isError ? <Alert severity="error">{t('forms:submit_error')}</Alert> : undefined}
                            <TriButton loading={isLoading} type="submit">
                                {t('forms:submit')}
                            </TriButton>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
        </Section>
    )
}

export default ContactUs
