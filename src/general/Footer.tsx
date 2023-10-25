import { FunctionComponent } from 'react'

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
}))

const Footer: FunctionComponent<FooterProps> = ({ order = 0 }) => {
    const { t } = useTranslation()

    return (
        <FooterRoot order={order}>
            <Box
                display="grid"
                gap={Spacing.Header}
                gridTemplateColumns="max-content 1fr max-content"
                alignItems="center"
                width={1}
                sx={{
                    backgroundColor: '#101010 !important',
                }}
            >
                <Stack spacing={Spacing.Header} direction="row" alignItems="center">
                    <Typography
                        variant="body2"
                        marginBottom={0}
                        sx={{
                            color: '#fff !important',
                            backgroundColor: '#101010 !important',
                        }}
                    >
                        {t('home:footer.name')}
                    </Typography>
                </Stack>
            </Box>
        </FooterRoot>
    )
}

export type { FooterProps }

export default Footer
