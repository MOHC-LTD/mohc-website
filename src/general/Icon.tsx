import { forwardRef, HTMLAttributes } from 'react'

import { buttonClasses, generateUtilityClasses, styled } from '@mui/material'
import { important } from 'polished'

import { MaterialSymbol } from 'src/materialSymbolsTypes'
import { Color } from 'src/theme/types'

interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'size'> {
    name: MaterialSymbol | string
    filled?: boolean
    color?: Color | 'inherit' | string
    size?: IconSize
    weight?: IconWeight
}

// TODO: change to sm/md/lg/xl
type IconSize = number | 'inherit' | 'small' | 'medium' | 'large' | 'extra-large'

type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700

interface FontSizes {
    fontSize: number | string
    opsz: number
}

const iconOptions: Record<IconSize, FontSizes> = {
    inherit: {
        fontSize: '1em',
        opsz: 20,
    },
    small: {
        fontSize: 20,
        opsz: 20,
    },
    medium: {
        fontSize: 24,
        opsz: 24,
    },
    large: {
        fontSize: 40,
        opsz: 40,
    },
    'extra-large': {
        fontSize: 80,
        opsz: 40,
    },
}

const pickerButtonClasses = generateUtilityClasses('PickerButton', ['root', 'selected', 'current', 'error'])

const Icon = styled(
    forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
        const { name, color: _, size: __, filled: ___, weight: ____, ...rest } = props

        return (
            <span role="img" {...rest} ref={ref}>
                {name}
            </span>
        )
    }),
    {
        name: 'Icon',
    }
)(({ theme, color, size = 'medium', filled = true, weight = 400 }) => ({
    fontFamily: '"Material Symbols Rounded"',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: iconOptions[size].fontSize,
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'opsz' ${iconOptions[size].opsz}, 'wght' ${weight}`,
    textRendering: 'optimizeLegibility',
    display: 'inline-block',
    lineHeight: 1,
    textTransform: 'none',
    letterSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'nowrap',
    direction: 'ltr',
    color: color && color in theme.palette ? theme.palette[color as Color].main : color,
    transition: theme.transitions.create(['font-size', 'font-variation-setting', 'color', 'transform'], {
        duration: theme.transitions.duration.short,
    }),
    userSelect: 'none',
    [`.${buttonClasses.startIcon} &, .${buttonClasses.endIcon} &, .${pickerButtonClasses.root} &`]: important({
        fontSize: iconOptions.small.fontSize,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'opsz' ${iconOptions.small.opsz}`,
        // Buttons already have color transition
        transition: theme.transitions.create(['font-size', 'font-variation-setting', 'transform'], {
            duration: theme.transitions.duration.short,
        }),
    }),
}))

export type { IconProps }

export { iconOptions }

export default Icon
