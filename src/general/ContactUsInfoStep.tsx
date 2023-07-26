import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
import { useJourney } from 'src/general/Header'

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
            <NameField
                field={{
                    label: t('forms:first_name.label') as string,
                    name: 'first_name',
                    required: t('forms:first_name.required_error') as string,
                    type: 'name',
                    validation: {
                        maxLength: 30,
                    },
                }}
                autoComplete="given-name"
            />
            <NameField
                field={{
                    label: t('forms:last_name.label') as string,
                    name: 'last_name',
                    required: t('forms:last_name.required_error') as string,
                    type: 'name',
                    validation: {
                        maxLength: 30,
                    },
                }}
                autoComplete="family-name"
            />
            <EmailField
                field={{
                    label: t('forms:email.label') as string,
                    name: 'email',
                    type: 'email',
                }}
            />
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button type="submit" onClick={(): void => gotoStep('Project')} variant="contained" color="info">
                    {t('forms:next')}
                </Button>
            </Box>
        </>
    )
}

export { ContactUsInfoStep }
