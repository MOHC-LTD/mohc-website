import { forwardRef, HTMLAttributes } from 'react'

import { styled } from '@mui/material'

import LoadingView from 'src/loading/LoadingView'

const ButtonLoadingView = styled(
    forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
        <div {...props} ref={ref}>
            <LoadingView longLoadingHint={false} size="sm" />
        </div>
    )),
    {
        name: 'ButtonLoadingView',
    }
)({
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
})

export default ButtonLoadingView
