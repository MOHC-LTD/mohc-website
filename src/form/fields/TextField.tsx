import { ChangeEvent, FocusEvent, FunctionComponent, KeyboardEvent, ReactNode, useRef } from 'react'

import { TextField as MUITextField, TextFieldProps as MUITextFieldProps, useForkRef } from '@mui/material'
import is from '@sindresorhus/is'
import { isKeyHotkey } from 'is-hotkey'
import { RegisterOptions, useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Except } from 'type-fest'

import FieldLayout from 'src/form/FieldLayout'
import { useRequiredRule } from 'src/form/hooks/useRequiredRule'
import { EmailFieldConfig, NameFieldConfig, TextAreaFieldConfig, TextFieldConfig } from 'src/form/types'
import { getDescribedBy } from 'src/form/utils/getDescribedBy'
import { getFormFieldId } from 'src/form/utils/getFormFieldId'
import { getValidateRules } from 'src/form/utils/getValidateRules'

type TextFieldFieldConfigs = TextFieldConfig | TextAreaFieldConfig | EmailFieldConfig | NameFieldConfig

/**
 * Allowed props from MUI's text field component which will be forwarded directly to it.
 */
type AllowedMUITextFieldProps = Pick<
    MUITextFieldProps,
    'type' | 'autoComplete' | 'disabled' | 'multiline' | 'rows' | 'minRows' | 'maxRows'
>

interface TextFieldProps extends AllowedMUITextFieldProps {
    /**
     * Field config.
     */
    field: TextFieldFieldConfigs
    /**
     * Additional validation rules.
     */
    rules?: Except<RegisterOptions, 'required' | 'minLength' | 'maxLength'>
    /**
     * Error message which is displayed when the input has the required error.
     */
    defaultRequiredMessage?: string
    /**
     * Whether to disallow the input from being focused and its value from being modified.
     */
    readOnly?: boolean
    /**
     * Whether to forbid new lines from being entered and rendered inside the input.
     */
    disableNewLines?: boolean
    /**
     * Whether to prevent form submission when pressing enter inside the input.
     */
    preventFormSubmit?: boolean
    /**
     * Custom `onChange` handler. If provided, will be used instead of the default `onChange` handler, including all
     * logic custom to this component. Should return the new input value or `null` to clear the value.
     */
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => null | string
    /**
     * Custom event handler. If provided and it returns either a string or `null`, the input value will be updated
     * with the returned value.
     */
    onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => TextFieldEventHandlerReturn
    /**
     * Custom event handler. If provided and it returns either a string or `null`, the input value will be updated
     * with the returned value.
     */
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => TextFieldEventHandlerReturn
    /**
     * Custom event handler. If provided and it returns either a string or `null`, the input value will be updated
     * with the returned value.
     */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => TextFieldEventHandlerReturn
    /**
     * Input start adornment. Must be wrapped in the `InputAdornment` component.
     */
    startAdornment?: ReactNode
    /**
     * Input end adornment. Must be wrapped in the `InputAdornment` component.
     */
    endAdornment?: ReactNode
}

type TextFieldEventHandlerReturn = void | undefined | null | string

interface InheritedTextFieldProps<TFieldConfig extends TextFieldFieldConfigs>
    extends Except<TextFieldProps, 'field' | 'defaultRequiredMessage'> {
    field: TFieldConfig
}

const newlineRegex = /\n/g

const TextField: FunctionComponent<TextFieldProps> = ({
    rules,
    defaultRequiredMessage,
    readOnly,
    disableNewLines,
    preventFormSubmit,
    onChange: propsOnChange,
    onBlur: propsOnBlur,
    onKeyUp,
    onKeyDown,
    startAdornment,
    endAdornment,
    ...props
}) => {
    const { field, ...rest } = props

    const { t } = useTranslation()

    const { required } = useRequiredRule(field.required, defaultRequiredMessage)

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({
        name: field.name,
        rules: {
            ...rules,
            required,
            ...(!!field.validation && {
                ...(is.number(field.validation.minLength) && {
                    minLength: {
                        value: field.validation.minLength,
                        message: t('forms:text.minimum_characters_error', {
                            count: field.validation.minLength,
                        }),
                    },
                }),
                ...(is.number(field.validation.maxLength) && {
                    maxLength: {
                        value: field.validation.maxLength,
                        message: t('forms:text.maximum_characters_error', {
                            count: field.validation.maxLength,
                        }),
                    },
                }),
            }),
            validate: {
                ...getValidateRules(rules),
                whitespace: (currentValue) => {
                    if (required.value && !is.nonEmptyStringAndNotWhitespace(currentValue)) {
                        return required.message
                    }

                    return true
                },
            },
        },
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const forkedRef = useForkRef<HTMLInputElement>(ref, inputRef)

    const textfieldValue = value && disableNewLines ? value.replace(newlineRegex, '') : value

    return (
        <FieldLayout {...props} error={error} required={required.value}>
            <MUITextField
                {...rest}
                inputRef={forkedRef}
                id={getFormFieldId(field.name)}
                value={textfieldValue || ''}
                placeholder={field.placeholder}
                name={field.name}
                error={!!error}
                fullWidth
                onChange={(event): void => {
                    if (readOnly) {
                        return
                    }

                    // If given a custom on change handler, assume it will fully handle the `onChange` event and
                    // provide the new value
                    if (propsOnChange) {
                        onChange(propsOnChange(event))

                        return
                    }

                    if (disableNewLines) {
                        onChange(event.currentTarget.value.replace(newlineRegex, ''))

                        return
                    }

                    onChange(event.currentTarget.value)
                }}
                onBlur={(event): void => {
                    onBlur()

                    // If given a custom on blur handler and it returns a non-undefined value,
                    // assume that`onChange` should be called to update the value
                    if (propsOnBlur) {
                        const result = propsOnBlur(event)

                        if (!is.undefined(result)) {
                            onChange(result)
                        }
                    }
                }}
                InputProps={{
                    startAdornment,
                    endAdornment,
                    readOnly,
                    inputProps: {
                        'aria-describedby': getDescribedBy(field, error),
                        'aria-label': field.label ? undefined : field.placeholder,
                        tabIndex: readOnly ? -1 : undefined,
                    },
                    onKeyUp: (event): void => {
                        if (preventFormSubmit && isKeyHotkey('enter', event)) {
                            event.preventDefault()

                            event.stopPropagation()
                        }

                        if (disableNewLines && !preventFormSubmit && isKeyHotkey('enter', event)) {
                            inputRef.current?.closest('form')?.requestSubmit()
                        }

                        // If given a custom on key up handler and it returns a non-undefined value,
                        // assume that`onChange` should be called to update the value
                        if (onKeyUp) {
                            const result = onKeyUp(event)

                            if (!is.undefined(result)) {
                                onChange(result)
                            }
                        }
                    },
                    onKeyDown: (event): void => {
                        if (preventFormSubmit && isKeyHotkey('enter', event)) {
                            event.preventDefault()

                            event.stopPropagation()
                        }

                        // If given a custom on key down handler and it returns a non-undefined value,
                        // assume that`onChange` should be called to update the value
                        if (onKeyDown) {
                            const result = onKeyDown(event)

                            if (!is.undefined(result)) {
                                onChange(result)
                            }
                        }
                    },
                }}
            />
        </FieldLayout>
    )
}

export type { InheritedTextFieldProps, TextFieldEventHandlerReturn, TextFieldProps }

export default TextField
