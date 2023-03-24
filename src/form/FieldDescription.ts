import isPropValid from '@emotion/is-prop-valid'
import { styled } from '@mui/material'

import { Spacing } from 'src/general/utils/config'

interface FieldDescriptionProps {
    disabled?: boolean
}

const FieldDescription = styled('div', {
    name: 'FieldDescription',
    shouldForwardProp: isPropValid,
})<FieldDescriptionProps>(({ disabled, theme }) => ({
    marginBottom: theme.spacing(Spacing.FieldLabel * 2),
    ...(disabled && {
        opacity: theme.palette.action.disabledOpacity,
    }),
}))

export default FieldDescription
