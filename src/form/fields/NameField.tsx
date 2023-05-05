import { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import TextField, { InheritedTextFieldProps } from 'src/form/fields/TextField'
import { NameFieldConfig } from 'src/form/types'

const NameField: FunctionComponent<InheritedTextFieldProps<NameFieldConfig>> = (props) => {
    const { t } = useTranslation()

    return (
        <TextField
            {...props}
            defaultRequiredMessage={t('forms:name.required_error') || undefined}
            autoComplete="given-name"
        />
    )
}

export default NameField
