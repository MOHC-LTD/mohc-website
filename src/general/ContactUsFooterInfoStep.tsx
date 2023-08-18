import { FunctionComponent } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import EmailField from 'src/form/fields/EmailField'
import NameField from 'src/form/fields/NameField'
import { useJourney } from 'src/general/ContactUsProvider'

const ContactUsFooterInfoStep: FunctionComponent = () => {
    const { t } = useTranslation()

    const { gotoStep } = useJourney()

    return (
        <>
            <Box component="div" mb={4}>
                <NameField
                    field={{
                        name: 'first_name',
                        required: t('forms:first_name.required_error') as string,
                        type: 'name',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    color="secondary"
                    label={t('forms:first_name.label') as string}
                    autoComplete="given-name"
                />
            </Box>
            <Box component="div" mb={4}>
                <NameField
                    field={{
                        name: 'last_name',
                        required: t('forms:last_name.required_error') as string,
                        type: 'name',
                        validation: {
                            maxLength: 30,
                        },
                    }}
                    color="secondary"
                    label={t('forms:last_name.label') as string}
                    autoComplete="family-name"
                />
            </Box>
            <Box component="div" mb={6}>
                <EmailField
                    field={{
                        name: 'email',
                        type: 'email',
                    }}
                    color="secondary"
                    label={t('forms:email.label') as string}
                />
            </Box>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    type="submit"
                    onClick={(): void => gotoStep('Project')}
                    variant="contained"
                    color="secondary"
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

export { ContactUsFooterInfoStep }
