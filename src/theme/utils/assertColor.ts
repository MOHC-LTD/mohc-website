import { Color } from 'src/theme/types'

/**
 * Disables color prop values which are not theme colors, for example values like "default" and "inherit". Useful
 * if you want to be able to use the value as a pallette key.
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function assertColor(color: Color | 'default' | 'inherit' | undefined, componentName: string): asserts color is Color {
    if (color === 'inherit' || color === 'default') {
        throw new Error(`The "${color}" color is not supported for ${componentName}.`)
    }
}

export { assertColor }
