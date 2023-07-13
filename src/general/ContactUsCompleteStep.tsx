import { FunctionComponent } from 'react'

import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ContactUsCompleteStep: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <>
            <Typography align="center" mb={2} variant="h5">
                {t('forms:contact_us.thank_you_title')}
            </Typography>
            <Typography mb={5} align="center" variant="body2">
                {t('forms:contact_us.thank_you_subtitle')}
            </Typography>
        </>
    )
}

export { ContactUsCompleteStep }
