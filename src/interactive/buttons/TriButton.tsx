import { AnchorHTMLAttributes, forwardRef } from 'react'

import { Button, ButtonProps as MUIButtonProps, generateUtilityClasses } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'

import ButtonLoadingView from 'src/interactive/buttons/ButtonLoadingView'
import { Color } from 'src/theme/types'

type TriButtonVariant = 'primary' | 'secondary' | 'tertiary'

interface TriButtonButtonProps
    extends Omit<MUIButtonProps, 'component' | 'href' | 'LinkComponent' | 'ref' | 'variant'> {
    destructive?: boolean
    loading?: boolean
    variant?: TriButtonVariant
}

interface TriButtonLinkProps
    extends TriButtonButtonProps,
        Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'rel' | 'target'> {}

type TriButtonProps = TriButtonButtonProps | TriButtonLinkProps

const buttonVariant: Record<TriButtonVariant, MUIButtonProps['variant']> = {
    primary: 'contained',
    secondary: 'outlined',
    tertiary: 'text',
}

const buttonColor: Record<TriButtonVariant, MUIButtonProps['color']> = {
    primary: 'secondary',
    secondary: 'primary',
    tertiary: 'primary',
}

const textColor: Record<TriButtonVariant, Color> = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'secondary',
}

const triButtonClasses = generateUtilityClasses('TriButton', ['root', 'loading'])

const TriButton = forwardRef<HTMLButtonElement, TriButtonProps>((props, ref) => {
    const {
        variant = 'primary',
        color = buttonColor[variant],
        destructive,
        disabled,
        loading,
        className,
        href,
        children,
        ...rest
    } = props

    return (
        <Button
            {...(!!href && {
                component: Link,
                href,
                legacyBehavior: false,
            })}
            {...rest}
            ref={ref}
            className={clsx(className, triButtonClasses.root, {
                [triButtonClasses.loading]: loading,
            })}
            color={destructive ? 'error' : color}
            disabled={disabled || loading}
            variant={buttonVariant[variant]}
            sx={{ color: textColor[variant] }}
        >
            {loading ? <ButtonLoadingView /> : undefined}
            {children}
        </Button>
    )
})

export type { TriButtonButtonProps, TriButtonLinkProps, TriButtonProps, TriButtonVariant }

export { triButtonClasses }

export default TriButton
