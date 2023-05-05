import {
    alpha,
    buttonClasses,
    circularProgressClasses,
    createTheme,
    darken,
    iconButtonClasses,
    inputBaseClasses,
    outlinedInputClasses,
    ThemeOptions,
} from '@mui/material'
import { rem } from 'polished'

import { GeneralConfig, Spacing } from 'src/general/utils/config'
import { FontFamilyConfig, Palette, ThemeOptionsComponents } from 'src/theme/types'
import { assertColor } from 'src/theme/utils/assertColor'

const fontFamilyConfig: FontFamilyConfig = {
    name: 'roc-grotesk',
    weights: {
        light: 300,
        regular: 400,
        medium: 600,
        bold: 700,
    },
}

const components: ThemeOptionsComponents = {
    MuiTypography: {
        defaultProps: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'p',
                subtitle2: 'p',
                body1: 'p',
                body2: 'p',
                overline: 'p',
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: {
                textDecoration: 'none',
            },
        },
    },
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            endIcon: ({ theme }) => ({
                margin: 0,
                marginLeft: theme.spacing(Spacing.ButtonMediumHorizontal / 2),
                marginRight: theme.spacing(-Spacing.ButtonMediumHorizontal / 4),
                [`.${buttonClasses.sizeSmall} &`]: {
                    marginLeft: theme.spacing(Spacing.ButtonSmallHorizontal / 2),
                    marginRight: theme.spacing(-Spacing.ButtonSmallHorizontal / 4),
                },
                [`.${buttonClasses.text} &`]: {
                    marginLeft: theme.spacing(Spacing.ButtonMediumHorizontal / 8),
                    marginRight: 0,
                    [`.${buttonClasses.sizeSmall} &`]: {
                        marginLeft: theme.spacing(Spacing.ButtonSmallHorizontal / 8),
                        marginRight: 0,
                    },
                },
            }),
            root: ({ ownerState: { color }, theme }) => {
                assertColor(color, 'MuiButton')

                return {
                    border: 'none',
                    borderRadius: 0,
                    fontSize: theme.typography.body1.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                    minHeight: theme.spacing(GeneralConfig.ButtonMediumHeight),
                    minWidth: 'unset',
                    padding: theme.spacing(Spacing.ButtonMediumVertical, Spacing.ButtonMediumHorizontal),
                    position: 'relative',
                    [`&:hover, &:active, &.${buttonClasses.focusVisible}`]: {
                        border: 'none',
                        backgroundColor: '#nnn',
                    },
                    [`&:active, &.${buttonClasses.focusVisible}`]: {
                        border: 'none',
                        backgroundColor: '#nnn',
                    },
                    [`&.${buttonClasses.sizeSmall}`]: {
                        fontSize: theme.typography.overline.fontSize,
                        minHeight: theme.spacing(GeneralConfig.ButtonSmallHeight),
                        padding: theme.spacing(Spacing.ButtonSmallVertical, Spacing.ButtonSmallHorizontal),
                    },
                    [`&.${buttonClasses.disabled}`]: {
                        border: 'none',
                        color: theme.palette[color].main,
                        opacity: theme.palette.action.disabledOpacity,
                    },
                    [`&.${buttonClasses.contained}`]: {
                        color: theme.palette[color].contrastText,
                        [`&.${buttonClasses.disabled}`]: {
                            backgroundColor: theme.palette[color].main,
                            color: theme.palette[color].contrastText,
                        },
                        [`.${circularProgressClasses.root}`]: {
                            color: theme.palette[color].contrastText,
                        },
                    },
                    [`&.${buttonClasses.outlined}`]: {
                        color: theme.palette[color].contrastText,
                        [`&.${buttonClasses.disabled}`]: {
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: `inset 0 0 0 1px ${theme.palette[color].main}`,
                        },
                    },
                    [`&.${buttonClasses.text}`]: {
                        color: theme.palette[color].contrastText,
                        padding: theme.spacing(Spacing.ButtonMediumVertical, Spacing.ButtonMediumHorizontal / 2),
                        [`&.${buttonClasses.sizeSmall}`]: {
                            padding: theme.spacing(Spacing.ButtonSmallVertical, Spacing.ButtonSmallHorizontal / 2),
                        },
                        [`&.${buttonClasses.disabled}`]: {
                            backgroundColor: alpha(theme.palette.background.paper, 0),
                        },
                    },
                    [`.${circularProgressClasses.root}`]: {
                        color: theme.palette[color].main,
                    },
                }
            },
            startIcon: ({ theme }) => ({
                margin: 0,
                marginLeft: theme.spacing(-Spacing.ButtonMediumHorizontal / 4),
                marginRight: theme.spacing(Spacing.ButtonMediumHorizontal / 2),
                [`.${buttonClasses.sizeSmall} &`]: {
                    marginLeft: theme.spacing(-Spacing.ButtonSmallHorizontal / 4),
                    marginRight: theme.spacing(Spacing.ButtonSmallHorizontal / 2),
                },
                [`.${buttonClasses.text} &`]: {
                    marginLeft: 0,
                    marginRight: theme.spacing(Spacing.ButtonMediumHorizontal / 8),
                    [`.${buttonClasses.sizeSmall} &`]: {
                        marginLeft: 0,
                        marginRight: theme.spacing(Spacing.ButtonSmallHorizontal / 8),
                    },
                },
            }),
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            adornedEnd: ({ theme }) => ({
                paddingRight: theme.spacing(1.5),
            }),
            adornedStart: ({ theme }) => ({
                paddingLeft: theme.spacing(1.5),
            }),
            input: ({ theme }) => ({
                '&[type="password"]': {
                    fontFamily: 'Verdana',
                    letterSpacing: theme.spacing(0.25),
                },
                boxSizing: 'border-box',
                height: theme.spacing(GeneralConfig.InputHeight),
                padding: theme.spacing(Spacing.InputVertical, Spacing.InputHorizontal),
                textOverflow: 'ellipsis',
                color: theme.palette.common.white,
                [`&.${outlinedInputClasses.disabled}`]: {
                    WebkitTextFillColor: 'unset',
                    color: alpha(theme.palette.text.primary, theme.palette.action.disabledOpacity),
                },
            }),
            inputAdornedEnd: ({ theme }) => ({
                paddingRight: theme.spacing(1.5),
            }),
            inputAdornedStart: ({ theme }) => ({
                paddingLeft: theme.spacing(1.5),
            }),
            multiline: ({ theme }) => ({
                padding: theme.spacing(0),
            }),
            notchedOutline: ({ theme }) => ({
                border: 'none',
                boxShadow: `inset 0 0 0 1px ${theme.palette.common.white}`,
                borderRadius: 0,
                // Default hover
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}:hover &`]: {
                    boxShadow: `inset 0 0 0 1px ${theme.palette.secondary.main}`,
                },
                // Default focused
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}.${outlinedInputClasses.focused} &`]: {
                    boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
                },
                // Default disabled
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}.${outlinedInputClasses.disabled} &`]: {
                    backgroundColor: theme.palette.action.hover,
                    boxShadow: 'none',
                },
                // Error
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}.${outlinedInputClasses.error} &`]: {
                    boxShadow: `inset 0 0 0 1px ${theme.palette.error.main}`,
                },
                // Error hover
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}.${outlinedInputClasses.error}:hover &`]: {
                    boxShadow: `inset 0 0 0 1px ${theme.palette.error.main}`,
                },
                // Error focused
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}` +
                `.${outlinedInputClasses.error}.${outlinedInputClasses.focused} &`]: {
                    boxShadow: `inset 0 0 0 2px ${theme.palette.error.main}`,
                },
                // Error disabled
                [`.${inputBaseClasses.root}.${outlinedInputClasses.root}` +
                `.${outlinedInputClasses.error}.${outlinedInputClasses.disabled} &`]: {
                    backgroundColor: theme.palette.action.disabledBackground,
                    boxShadow: 'none',
                },
            }),
            root: ({ theme }) => ({
                maxWidth: '100%',
                minHeight: theme.spacing(GeneralConfig.InputHeight),
                marginBottom: '50px',
                [`.${iconButtonClasses.edgeStart}`]: {
                    margin: theme.spacing(0, -1),
                },
                [`.${iconButtonClasses.edgeEnd}`]: {
                    margin: theme.spacing(0, -1),
                },
            }),
        },
    },
}

const opacity = {
    hoverOpacity: 0.075,
    selectedOpacity: 0.125,
    disabledOpacity: 0.35,
    focusOpacity: 0.125,
    activatedOpacity: 0.125,
}

const colors = {
    primary: '#101010',
    secondary: '#fff',
    info: '#9B37FF',
    error: '#FA391F',
    warning: '#FFB321',
    success: '#01AF85',
}

const palette: Palette = {
    primary: {
        light: colors.primary,
        main: colors.primary,
        dark: colors.primary,
        contrastText: '#fff',
    },
    secondary: {
        light: alpha(colors.secondary, opacity.selectedOpacity),
        main: colors.secondary,
        dark: darken(colors.secondary, 0.75),
        contrastText: '#101010',
    },
    info: {
        light: alpha(colors.info, opacity.selectedOpacity),
        main: colors.info,
        dark: darken(colors.info, 0.75),
        contrastText: '#fff',
    },
    error: {
        light: alpha(colors.error, opacity.selectedOpacity),
        main: colors.error,
        dark: darken(colors.error, 0.5),
        contrastText: '#fff',
    },
    warning: {
        light: alpha(colors.warning, opacity.selectedOpacity),
        main: colors.warning,
        dark: darken(colors.warning, 0.5),
        contrastText: '#fff',
    },
    success: {
        light: alpha(colors.success, opacity.selectedOpacity),
        main: colors.success,
        dark: darken(colors.success, 0.5),
        contrastText: '#fff',
    },
}

const textColor = palette.primary.main

const options: ThemeOptions = {
    components,
    palette: {
        ...palette,
        background: {
            default: '#FBF7F4',
            paper: '#FBF0E8',
        },
        text: {
            primary: textColor,
            secondary: '#fff',
        },
        action: {
            active: alpha(palette.primary.main, 0.5),
            hover: alpha(palette.primary.main, opacity.hoverOpacity),
            hoverOpacity: opacity.hoverOpacity,
            selected: alpha(palette.primary.main, opacity.selectedOpacity),
            selectedOpacity: opacity.selectedOpacity,
            disabled: alpha(palette.primary.main, opacity.disabledOpacity),
            disabledBackground: alpha(palette.primary.main, opacity.disabledOpacity),
            disabledOpacity: opacity.disabledOpacity,
            focus: alpha(palette.primary.main, opacity.focusOpacity),
            focusOpacity: opacity.focusOpacity,
            activatedOpacity: opacity.activatedOpacity,
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: [
        'none',
        // Default paper shadow
        [
            `0 0px  4px ${alpha(textColor, 0.025)}`,
            `0 2px  8px ${alpha(textColor, 0.05)}`,
            `0 4px 16px ${alpha(textColor, 0.075)}`,
            `0 6px 24px ${alpha(textColor, 0.1)}`,
        ].join(','),
        // Scroll indicator shadow
        `0 0 6px ${alpha(textColor, 0.075)}, 0 0 8px ${alpha(textColor, 0.1)}`,
        // Unusable shadows reserved for future
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
        '0 0 0 5px #f00',
    ],
    breakpoints: {
        values: {
            xs: 0,
            sm: 0,
            md: 768,
            lg: 1024,
            xl: 1240,
        },
    },
}

let theme = createTheme(options)

theme = createTheme(theme, {
    typography: {
        fontFamily: fontFamilyConfig.name,
        fontWeightLight: fontFamilyConfig.weights.light,
        fontWeightRegular: fontFamilyConfig.weights.regular,
        fontWeightMedium: fontFamilyConfig.weights.medium,
        fontWeightBold: fontFamilyConfig.weights.bold,
        h1: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.bold,
            lineHeight: 1.3,
            fontSize: rem(38),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(84),
            },
        },
        h2: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.regular,
            lineHeight: 0.9,
            fontSize: rem(38),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(84),
            },
        },
        h3: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.bold,
            lineHeight: 1.3,
            fontSize: rem(32),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(54),
            },
        },
        h4: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.medium,
            lineHeight: 1.3,
            fontSize: rem(32),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(54),
            },
        },
        h5: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.bold,
            lineHeight: 1.2,
            fontSize: rem(22),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(28),
            },
        },
        h6: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.medium,
            lineHeight: 1.3,
            fontSize: rem(22),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(28),
            },
        },
        subtitle1: {
            fontFamily: fontFamilyConfig.name,
            fontSize: rem(20),
            fontWeight: fontFamilyConfig.weights.medium,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontFamily: fontFamilyConfig.name,
            fontSize: rem(20),
            fontWeight: fontFamilyConfig.weights.bold,
            lineHeight: 1.5,
        },
        body1: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.regular,
            lineHeight: 1.5,
            fontSize: rem(18),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(20),
            },
        },
        body2: {
            fontFamily: fontFamilyConfig.name,
            fontWeight: fontFamilyConfig.weights.regular,
            lineHeight: 1.4,
            fontSize: rem(14),
            [theme.breakpoints.up('md')]: {
                fontSize: rem(16),
            },
        },
    },
})

export { fontFamilyConfig, opacity, options, theme }
