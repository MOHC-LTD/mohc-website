import { FunctionComponent, PropsWithChildren } from 'react'

import { FormHelperText, FormHelperTextProps } from '@mui/material'

import IconText from 'src/general/IconText'
import { ReactEmptyRender } from 'src/general/utils/config'
import { MaterialSymbol } from 'src/materialSymbolsTypes'

interface FieldHelperTextProps extends FormHelperTextProps {
    icon?: MaterialSymbol | false
}

const FieldHelperText: FunctionComponent<PropsWithChildren<FieldHelperTextProps>> = ({
    error,
    icon = error ? 'error' : 'info',
    children,
    ...props
}) => {
    if (!children) {
        return ReactEmptyRender
    }

    return (
        <FormHelperText {...props} error={error}>
            {icon !== false ? (
                <IconText color={error ? 'error' : 'info'} name={icon} size={1.25}>
                    {children}
                </IconText>
            ) : (
                children
            )}
        </FormHelperText>
    )
}

export type { FieldHelperTextProps }

export default FieldHelperText
