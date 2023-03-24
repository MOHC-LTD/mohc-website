import { FunctionComponent, PropsWithChildren } from 'react'

import { FormControl, FormLabel } from '@mui/material'
import is from '@sindresorhus/is'
import { FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import FieldDescription from 'src/form/FieldDescription'
import FieldHelperText from 'src/form/FieldHelperText'
import { FieldConfig, NoField } from 'src/form/types'
import { getFormFieldHelperTextId } from 'src/form/utils/getFormFieldHelperTextId'
import { getFormFieldId } from 'src/form/utils/getFormFieldId'
import { getFormFieldLabelId } from 'src/form/utils/getFormFieldLabelId'
import RichText from 'src/rich-text/RichText'

interface FieldLayoutProps {
    disabled?: boolean
    error?: FieldError | boolean | string
    field: FieldConfig | NoField
    required?: boolean
}

const fieldsetFieldTypes = new Set(['radio', 'checkbox', 'switch'])

const FieldLayout: FunctionComponent<PropsWithChildren<FieldLayoutProps>> = ({
    children,
    disabled,
    error,
    field,
    required = true,
}) => {
    const { t } = useTranslation()

    const hasErrorMessage =
        is.nonEmptyStringAndNotWhitespace(error) ||
        (is.plainObject(error) && is.nonEmptyStringAndNotWhitespace(error.message) && error.type !== 'predicate')

    const fieldset = field.type ? fieldsetFieldTypes.has(field.type) : false

    const showErrorMessage = hasErrorMessage && !disabled

    return (
        <FormControl
            aria-describedby={
                fieldset && (field.description || showErrorMessage) ? getFormFieldHelperTextId(field.name) : undefined
            }
            aria-invalid={!!(fieldset && error)}
            component={fieldset ? 'fieldset' : 'div'}
            data-testid="form-control"
            disabled={disabled}
            error={hasErrorMessage || error === true}
            fullWidth
            required={required}
        >
            {field.label ? (
                <FormLabel
                    component={fieldset ? 'legend' : 'label'}
                    disabled={disabled}
                    error={false}
                    htmlFor={fieldset ? undefined : getFormFieldId(field.name)}
                    id={getFormFieldLabelId(field.name)}
                    required={false}
                >
                    {field.label}
                    {!required ? <> {t('forms:general.optional_label')}</> : undefined}
                </FormLabel>
            ) : undefined}
            {field.description ? (
                <FieldDescription
                    disabled={!!disabled}
                    id={hasErrorMessage ? undefined : getFormFieldHelperTextId(field.name)}
                >
                    <RichText value={field.description} variant="body2" />
                </FieldDescription>
            ) : undefined}
            {children}
            {showErrorMessage ? (
                <FieldHelperText error id={getFormFieldHelperTextId(field.name)}>
                    {is.string(error) ? error : error.message}
                </FieldHelperText>
            ) : undefined}
        </FormControl>
    )
}

export type { FieldLayoutProps }

export default FieldLayout
