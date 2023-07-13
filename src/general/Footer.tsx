import { FunctionComponent, PropsWithChildren } from 'react'

import isPropValid from '@emotion/is-prop-valid'
import { Box, Stack, styled, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { GeneralConfig, Spacing } from 'src/general/utils/config'

interface FooterProps {
    disableStickyShadow?: boolean
    order?: number
}

interface FooterRootProps {
    order: number
}

const FooterRoot = styled('footer', {
    name: 'FooterRoot',
    shouldForwardProp: isPropValid,
})<FooterRootProps>(({ theme, order }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.text.secondary,
    position: 'sticky',
    padding: theme.spacing(0, Spacing.Header),
    height: theme.spacing(GeneralConfig.ToolbarHeight),
    top: theme.spacing(GeneralConfig.ToolbarHeight * order),
    zIndex: theme.zIndex.tooltip,
    scrollSnapAlign: 'start',
}))

const Footer: FunctionComponent<PropsWithChildren<FooterProps>> = ({ order = 0 }) => {
    const { t } = useTranslation()

    return (
        <FooterRoot order={order}>
            <Box
                component="div"
                display="grid"
                gap={Spacing.Header}
                gridTemplateColumns="max-content 1fr max-content"
                alignItems="center"
                width={1}
            >
                <Stack spacing={Spacing.Header} direction="row" alignItems="center">
                    <Typography variant="body2" marginBottom={0}>
                        {t('home:footer.name')}
                    </Typography>
                </Stack>
            </Box>
        </FooterRoot>
    )
}

export type { FooterProps }

export default Footer
