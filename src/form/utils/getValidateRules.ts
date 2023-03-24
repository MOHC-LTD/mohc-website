import is from '@sindresorhus/is'
import { RegisterOptions, Validate } from 'react-hook-form'

const getValidateRules = (rules?: RegisterOptions): Record<string, Validate<unknown>> | undefined => {
    if (!rules?.validate) {
        return undefined
    }

    if (is.function_(rules.validate)) {
        return {
            validate: rules.validate,
        }
    }

    return {
        ...rules.validate,
    }
}

export { getValidateRules }
