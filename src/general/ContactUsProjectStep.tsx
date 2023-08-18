import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TextField from 'src/form/fields/TextField'
import { useJourney } from 'src/general/ContactUsProvider'

const ContactUsProjectStep: FunctionComponent = () => {
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
            <Box component="div" mb={4}>
                <TextField
                    field={{
                        name: 'project',
                        required: t('forms:general.required_error') as string,
                        type: 'text',
                    }}
                    multiline
                    label={t('forms:contact_us.project_label') as string}
                />
            </Box>
            <Box component="div" mb={6}>
                <TextField
                    field={{
                        name: 'budget',
                        required: t('forms:general.required_error') as string,
                        type: 'text',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    label={t('forms:contact_us.budget_label') as string}
                />
            </Box>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    type="submit"
                    onClick={(): void => gotoStep('Complete')}
                    variant="contained"
                    color="info"
                    sx={{
                        borderRadius: '25px',
                        padding: '5px 40px',
                        textTransform: 'none',
                    }}
                >
                    <Typography>{t('forms:submit')}</Typography>
                </Button>
            </Box>
        </>
    )
}

export { ContactUsProjectStep }
