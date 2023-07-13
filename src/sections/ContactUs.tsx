import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
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
        <Section maxWidth="xl" backgroundColor="#E7F2FF" id={sectionId}>
            <Box
                component="div"
                my={4}
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
                    component="div"
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
                    <Typography variant="h5" color={theme.palette.text.primary} marginBottom="20px">
                        {t('home:contact_us.title')}
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.primary}>
                        {t('home:contact_us.subtitle')}
                    </Typography>
                </Box>
                <Box
                    component="div"
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
                                    label: t('forms:first_name.label') || undefined,
                                    name: 'first_name',
                                    required: t('forms:first_name.required_error') || undefined,
                                    type: 'name',
                                    validation: {
                                        maxLength: 30,
                                    },
                                }}
                            />
                            <NameField
                                field={{
                                    label: t('forms:last_name.label') || undefined,
                                    name: 'last_name',
                                    required: t('forms:last_name.required_error') || undefined,
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
                            <TriButton type="submit">{t('forms:submit')}</TriButton>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
        </Section>
    )
}

export default ContactUs
