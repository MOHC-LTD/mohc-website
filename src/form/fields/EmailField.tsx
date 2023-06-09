import { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import TextField, { InheritedTextFieldProps } from 'src/form/fields/TextField'
import { EmailFieldConfig } from 'src/form/types'

const EmailField: FunctionComponent<InheritedTextFieldProps<EmailFieldConfig>> = (props) => {
    const { t } = useTranslation()

    return (
        <TextField
            {...props}
            rules={{
                pattern: {
                    value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                    message: t('forms:email.required_error'),
                },
            }}
            defaultRequiredMessage={t('forms:email.required_error') || undefined}
            autoComplete="email"
            type="email"
        />
    )
}

export default EmailField
