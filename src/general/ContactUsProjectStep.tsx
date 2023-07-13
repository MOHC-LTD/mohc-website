import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TextField from 'src/form/fields/TextField'
import { useJourney } from 'src/general/Header'

const ContactUsProjectStep: FunctionComponent = () => {
    const { t } = useTranslation()

    const { gotoStep } = useJourney()

    return (
        <>
            <Typography align="center" mb={2} variant="h5">
                {t('forms:contact_us.name')}
            </Typography>
            <Typography mb={5} align="center" variant="body2">
                {t('forms:contact_us.subtitle')}
            </Typography>
            <TextField
                field={{
                    label: t('forms:contact_us.project_label') as string,
                    name: 'project',
                    required: t('forms:general.required_error') as string,
                    type: 'text',
                    validation: {
                        maxLength: 30,
                    },
                }}
            />
            <TextField
                field={{
                    label: t('forms:contact_us.budget_label') as string,
                    name: 'budget',
                    required: t('forms:general.required_error') as string,
                    type: 'text',
                    validation: {
                        maxLength: 30,
                    },
                }}
            />
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button type="submit" onClick={(): void => gotoStep('Complete')} variant="contained" color="info">
                    {t('forms:submit')}
                </Button>
            </Box>
        </>
    )
}

export { ContactUsProjectStep }
