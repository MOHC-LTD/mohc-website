import { Box, CSSObject } from '@mui/material'

const ReactEmptyRender = null

/**
 * Reusable theme spacing value for all elements.
 */
const enum Spacing {
    Body = 24,
    Page = 6,
    General = 4,
    Header = 4,
    Dialog = 2,
    DialogHeader = 4,
    Card = 2,
    Icons = 0.5,
    FieldLabel = 0.75,
    FieldOptionsList = 2,
    TypographyGutter = 1,
    List = 1,
    VerticalList = 4,
    HorizontalList = 4,
    TooltipList = 0.5,
    /**
     * This value is already in pixels.
     */
    PopoverMarginThreshold = 16,
    InputVertical = 1.25,
    InputHorizontal = 1.75,
    ButtonSmallVertical = 0.25,
    ButtonSmallHorizontal = 1,
    ButtonMediumVertical = 0.75,
    ButtonMediumHorizontal = 10,
    ListItemVertical = 1.25,
    ListItemHorizontal = 1.5,
}

/**
 * These are theme spacing values.
 */
const enum GeneralConfig {
    ToolbarHeight = 9,
    InputHeight = 6,
    ButtonMediumHeight = 5.5,
    ButtonSmallHeight = 3,
}

/**
 * Use for consistent widths between popovers.
 */
const enum PopoverWidth {
    XS = 150,
    SM = 200,
    MD = 250,
    LG = 300,
    XL = 400,
}

/**
 * Use numeric typography when there is a list of numbers or text with numbers which should be aligned in a list.
 */
const numericTypography: CSSObject = {
    fontVariant: 'tabular-nums',
}

/**
 * Includes common generic components which can be used inside translation strings.
 */
const transComponents = {
    emphasis: <Box component="span" fontWeight="medium" />,
    time: <Box component="span" sx={numericTypography} />,
} as const

export { GeneralConfig, PopoverWidth, ReactEmptyRender, Spacing, numericTypography, transComponents }
