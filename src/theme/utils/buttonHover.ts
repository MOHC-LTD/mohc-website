import { CSSObject } from '@emotion/react'
import { alpha, buttonClasses } from '@mui/material'

interface ButtonHoverParams {
    backgroundColor: string
    boxShadowColor: string
    outlined?: boolean
    outlinedHover?: boolean
}

const buttonHover = ({
    backgroundColor,
    boxShadowColor,
    outlined = true,
    outlinedHover = true,
}: ButtonHoverParams): CSSObject => ({
    backgroundColor,
    // This kind of shadow improves the animation to the hover shadow, so instead of going from
    // a transparent non-existent drop shadow, this one actually just shift down a couple of pixels
    // into the hover shadow. The opposite is done for the outline shadow, so instead of indenting it, it
    // fades in in the same place.
    boxShadow: `inset 0 0 0 1px ${outlined ? boxShadowColor : alpha(boxShadowColor, 0)}, 0 0 ${boxShadowColor}`,
    [`&:hover, &:active, &.${buttonClasses.focusVisible}`]: {
        backgroundColor,
        boxShadow: `inset 0 0 0 ${outlinedHover ? '1px' : '0'} ${boxShadowColor}, 2px 2px ${boxShadowColor}`,
    },
    [`&:active, &.${buttonClasses.focusVisible}`]: {
        backgroundColor,
        boxShadow: `inset 0 0 0 ${outlinedHover ? '1px' : '0'} ${boxShadowColor}, 1px 1px ${boxShadowColor}`,
    },
})

export { buttonHover }
