import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import TextField from 'src/form/fields/TextField'
import { useJourney } from 'src/general/ContactUsProvider'

const ContactUsFooterProjectStep: FunctionComponent = () => {
    const { t } = useTranslation()

    const { gotoStep } = useJourney()

    return (
        <>
            <Box mb={4}>
                <TextField
                    field={{
                        name: 'project',
                        required: t('forms:general.required_error') as string,
                        type: 'text',
                    }}
                    multiline
                    color="secondary"
                    label={t('forms:contact_us.project_label') as string}
                />
            </Box>
            <Box mb={6}>
                <TextField
                    field={{
                        name: 'budget',
                        required: t('forms:general.required_error') as string,
                        type: 'text',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    color="secondary"
                    label={t('forms:contact_us.budget_label') as string}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    type="submit"
                    onClick={(): void => gotoStep('Complete')}
                    variant="contained"
                    color="secondary"
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

export { ContactUsFooterProjectStep }
