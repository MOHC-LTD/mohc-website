import { CSSObject } from '@emotion/react'
import { Theme } from '@mui/material'

const stickyBoxShadow = (theme: Theme, stuck: boolean, stuckStyles?: CSSObject): CSSObject => ({
    transition: theme.transitions.create(['box-shadow'], {
        duration: theme.transitions.duration.standard,
    }),
    ...(stuck && {
        ...stuckStyles,
        boxShadow: theme.shadows[2],
    }),
})

export { stickyBoxShadow }
