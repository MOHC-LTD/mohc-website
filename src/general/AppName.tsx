import { FunctionComponent } from 'react'

import { ContainerProps } from '@mui/material'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Except } from 'type-fest'

import { fontFamilyConfig, theme } from 'src/theme/theme.default'

interface AppNameProps extends Except<ContainerProps, 'sx'> {
    isDarkMode?: boolean
}

const AppName: FunctionComponent<AppNameProps> = ({ isDarkMode = false }) => {
    const { t } = useTranslation()

    return (
        <Typography
            variant="h2"
            whiteSpace="nowrap"
            color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
            sx={{
                marginBottom: 0,
                fontWeight: fontFamilyConfig.weights.medium,
            }}
        >
            {t('home:header.name')}
        </Typography>
    )
}

export default AppName
