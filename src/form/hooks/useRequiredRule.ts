import is from '@sindresorhus/is'
import { ValidationValueMessage } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface UseRequiredRuleReturn {
    required: ValidationValueMessage<boolean>
}

const useRequiredRule = (
    required: boolean | string = true,
    defaultMessage: string | undefined = undefined
): UseRequiredRuleReturn => {
    const { t } = useTranslation()

    return {
        required: {
            message: is.string(required) ? required : defaultMessage || t('forms:general.required_error'),
            value: !!required,
        },
    }
}

export type { UseRequiredRuleReturn }

export { useRequiredRule }
