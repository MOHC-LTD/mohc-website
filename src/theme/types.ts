import { SimplePaletteColorOptions, ThemeOptions } from '@mui/material'

type Color = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'

type ThemeOptionsComponents = NonNullable<ThemeOptions['components']>

type Palette = Record<Color, SimplePaletteColorOptions>

interface FontFamilyConfig {
    src?: string
    name: string
    weights: {
        light: number
        regular: number
        medium: number
        bold: number
    }
}

export type { Color, FontFamilyConfig, Palette, ThemeOptionsComponents }
