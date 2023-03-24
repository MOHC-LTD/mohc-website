import { forwardRef } from 'react'

import { selectClasses, styled } from '@mui/material'
import { SetOptional } from 'type-fest'

import Icon, { IconProps } from 'src/general/Icon'

interface ExpandIconProps extends SetOptional<IconProps, 'name'> {
    expanded?: boolean
    variant?: 'menu' | 'select'
}

const ExpandIcon = styled(
    forwardRef<HTMLSpanElement, ExpandIconProps>((props, ref) => {
        const { expanded: _, variant = 'menu', ...rest } = props

        return <Icon {...rest} ref={ref} name={variant === 'select' ? 'arrow_drop_down' : 'expand_more'} />
    }),
    {
        name: 'ExpandIcon',
    }
)(({ expanded, theme, variant = 'menu' }) => ({
    ...(variant === 'menu' && {
        transform: 'translateY(5%) rotate(0deg)',
        ...(expanded && {
            transform: 'translateY(-5%) rotate(180deg)',
        }),
    }),
    ...(variant === 'select' && {
        color: theme.vars.palette.text.primary,
        pointerEvents: 'none',
        transform: 'rotate(0deg)',
        ...(expanded && {
            transform: 'rotate(180deg)',
        }),
        [`.${selectClasses.select}[aria-expanded="true"] &`]: {
            transform: 'rotate(180deg)',
        },
        [`.${selectClasses.disabled} &`]: {
            opacity: theme.vars.palette.action.disabledOpacity,
        },
    }),
}))

export type { ExpandIconProps }

export default ExpandIcon
