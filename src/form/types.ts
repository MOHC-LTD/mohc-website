import { ReactNode } from 'react'

import { Descendant } from 'slate'
import { Except } from 'type-fest'

type FieldValue = string | number

type FormValue = FieldValue | FieldValue[]

interface FieldOption {
    label: string
    renderLabel?: (params: FieldOptionRenderLabelParams) => ReactNode
    disableLabelTypography?: boolean
    renderFooter?: () => ReactNode
    value: FieldValue
    options?: FieldOption[]
}

interface FieldOptionRenderLabelParams {
    selected: boolean
}

interface BaseFieldConfig {
    name: string
    label?: string
    description?: Descendant[] | null
    required?: boolean | string
}

interface NoField extends Except<BaseFieldConfig, 'name'> {
    name: string
    type?: never
}

interface InputFieldConfig extends BaseFieldConfig {
    placeholder?: string
}

interface TextFieldConfig extends InputFieldConfig {
    type: 'text'
    validation?: TextFieldValidation
}

interface TextFieldValidation {
    minLength?: number
    maxLength?: number
}

interface TextAreaFieldConfig extends InputFieldConfig {
    type: 'textarea'
    validation?: TextFieldValidation
}

interface EmailFieldConfig extends InputFieldConfig {
    type: 'email'
    validation?: TextFieldValidation
}

interface NameFieldConfig extends InputFieldConfig {
    type: 'name'
    validation?: TextFieldValidation
}

type FieldConfig = TextFieldConfig | TextAreaFieldConfig | EmailFieldConfig | NameFieldConfig

type FormFieldProps<TFieldConfig extends FieldConfig, TFieldProps = unknown> = Omit<
    TFieldProps,
    'value' | 'onChange' | 'onBlur' | 'ref'
> & {
    field: TFieldConfig
}

/**
 * String form values must always be strings. Use empty strings to denote no value. This is so that it can be used
 * as an input element's value, can be reset to the correct value, and can be correctly checked for `isDirty`
 * by the form hook. All other values can be `null` to denote no value.
 *
 * You can still mark sting field as nullable with `string | null` if the string is not being used as an input value,
 * for example for a time picker or a generated token.
 *
 * The `Required<T>` is a method to ensure all properties of T can never be undefined so that we can correctly map
 * every property either to a value or `null`.
 */
type FormFieldValues<T> = {
    [P in keyof Required<T>]: NonNullable<Required<T>[P]> extends string ? Required<T>[P] : Required<T>[P] | null
}

export type {
    BaseFieldConfig,
    EmailFieldConfig,
    FieldConfig,
    FieldOption,
    FieldOptionRenderLabelParams,
    FieldValue,
    FormFieldProps,
    FormFieldValues,
    FormValue,
    InputFieldConfig,
    NameFieldConfig,
    NoField,
    TextAreaFieldConfig,
    TextFieldConfig,
    TextFieldValidation,
}
