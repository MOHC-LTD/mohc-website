import { FunctionComponent } from 'react'

import TextField, { InheritedTextFieldProps } from 'src/form/fields/TextField'
import { TextAreaFieldConfig } from 'src/form/types'

const TextareaField: FunctionComponent<InheritedTextFieldProps<TextAreaFieldConfig>> = (props) => (
    <TextField multiline minRows={3} maxRows={10} {...props} />
)

export default TextareaField
