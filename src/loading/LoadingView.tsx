import { FunctionComponent } from 'react'

import {
    Backdrop,
    Box,
    CircularProgress,
    generateUtilityClasses,
    Portal,
    Stack,
    Typography,
    TypographyVariant,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { expectNever } from 'ts-expect'

import DelayedRender from 'src/general/DelayedRender'
import { Spacing } from 'src/general/utils/config'

type Size = 'lg' | 'md' | 'sm' | 'xl' | 'xs'

type Variant = 'button' | 'default' | 'fullscreen' | 'overlay'

interface LoadingViewProps {
    longLoadingHint?: boolean
    size?: Size
    variant?: Variant
}

const loadingViewClasses = generateUtilityClasses('LoadingView', ['backdrop'])

const sizes: Record<
    Size,
    {
        progressSize: string
        typographyVariant: TypographyVariant
    }
> = {
    lg: {
        progressSize: '2.5rem',
        typographyVariant: 'body2',
    },
    md: {
        progressSize: '2rem',
        typographyVariant: 'body2',
    },
    sm: {
        progressSize: '1.5rem',
        typographyVariant: 'overline',
    },
    xl: {
        progressSize: '3rem',
        typographyVariant: 'body1',
    },
    xs: {
        progressSize: '1rem',
        typographyVariant: 'overline',
    },
}

const LoadingView: FunctionComponent<LoadingViewProps> = ({
    longLoadingHint = true,
    size = 'lg',
    variant = 'default',
}) => {
    const { t } = useTranslation()

    const children = (
        <Stack alignItems="center" overflow="hidden">
            <CircularProgress aria-label={t('general:loading.label')} size={sizes[size].progressSize} />
            <DelayedRender timeout={5000} visible={longLoadingHint}>
                <Box pt={Spacing.TypographyGutter}>
                    <Typography variant={sizes[size].typographyVariant}>
                        {t('general:loading.long_loading_hint')}
                    </Typography>
                </Box>
            </DelayedRender>
        </Stack>
    )

    switch (variant) {
        case 'fullscreen': {
            return (
                <Portal>
                    <Backdrop
                        className={loadingViewClasses.backdrop}
                        data-testid="backdrop"
                        open
                        sx={{
                            zIndex: 'modal',
                        }}
                    >
                        {children}
                    </Backdrop>
                </Portal>
            )
        }

        case 'overlay': {
            return (
                <Backdrop
                    className={loadingViewClasses.backdrop}
                    data-testid="backdrop"
                    open
                    sx={{
                        bottom: 0,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 'fab',
                    }}
                >
                    {children}
                </Backdrop>
            )
        }

        case 'button': {
            return (
                <Box
                    left="50%"
                    position="absolute"
                    sx={{
                        transform: 'translate(-50%, -50%)',
                    }}
                    top="50%"
                >
                    {children}
                </Box>
            )
        }

        case 'default': {
            return children
        }

        default: {
            return expectNever(variant)
        }
    }
}

export type { LoadingViewProps }

export { loadingViewClasses }

export default LoadingView
