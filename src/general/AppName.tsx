import { FunctionComponent, PropsWithChildren } from 'react'
import { ContainerProps } from '@mui/material'
import { Except } from 'type-fest'

import { Typography } from '@mui/material'
import { theme } from 'src/theme/theme.default'
import { useTranslation } from 'react-i18next'

interface AppNameProps extends Except<ContainerProps, 'sx'> {
    isDarkMode?: boolean
}

const AppName: FunctionComponent<PropsWithChildren<AppNameProps>> = ({ isDarkMode = false }) => {
    const { t } = useTranslation()

    return (
        <Typography
            variant="h5"
            whiteSpace="nowrap"
            color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
            sx={{ marginBottom: 0 }}
        >
            {t('home:header.name')}
        </Typography>
    )
}

export default AppName
