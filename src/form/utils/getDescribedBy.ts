import { FieldError } from 'react-hook-form'

import { FieldConfig } from 'src/form/types'
import { getFormFieldHelperTextId } from 'src/form/utils/getFormFieldHelperTextId'

const getDescribedBy = (field: FieldConfig, error: FieldError | boolean | undefined): string | undefined => {
    if (field.description || error) {
        return getFormFieldHelperTextId(field.name)
    }

    return undefined
}

export { getDescribedBy }
