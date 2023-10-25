import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ContactUsFooterCompleteStep: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Box
            m={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography align="center" mb={2} variant="h3" color="secondary">
                {t('forms:contact_us.thank_you_title')}
            </Typography>
            <Typography mb={5} align="center" variant="body1" color="secondary">
                {t('forms:contact_us.thank_you_subtitle')}
            </Typography>
        </Box>
    )
}

export { ContactUsFooterCompleteStep }
