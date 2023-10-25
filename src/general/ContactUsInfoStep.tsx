import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
import { useJourney } from 'src/general/ContactUsProvider'

const ContactUsInfoStep: FunctionComponent = () => {
    const { t } = useTranslation()

    const { gotoStep } = useJourney()

    return (
        <>
            <Typography align="center" mb={2} variant="h3">
                {t('forms:contact_us.name')}
            </Typography>
            <Typography mb={5} align="center" variant="body1">
                {t('forms:contact_us.subtitle')}
            </Typography>
            <Box mb={4}>
                <NameField
                    field={{
                        name: 'first_name',
                        required: t('forms:first_name.required_error') as string,
                        type: 'name',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    label={t('forms:first_name.label') as string}
                    autoComplete="given-name"
                />
            </Box>
            <Box mb={4}>
                <NameField
                    field={{
                        name: 'last_name',
                        required: t('forms:last_name.required_error') as string,
                        type: 'name',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    label={t('forms:last_name.label') as string}
                    autoComplete="family-name"
                />
            </Box>
            <Box mb={6}>
                <EmailField
                    field={{
                        name: 'email',
                        type: 'email',
                    }}
                    label={t('forms:email.label') as string}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    type="submit"
                    onClick={(): void => gotoStep('Project')}
                    variant="contained"
                    color="info"
                    sx={{
                        borderRadius: '25px',
                        padding: '5px 40px',
                        textTransform: 'none',
                    }}
                >
                    <Typography>{t('forms:next')}</Typography>
                </Button>
            </Box>
        </>
    )
}

export { ContactUsInfoStep }
