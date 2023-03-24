import { styled } from '@mui/material'
import { important } from 'polished'

const ContentContainer = styled('div', {
    name: 'ContentContainer',
})(({ theme }) => ({
    // Negate bottom margin on the last element
    '& > div': {
        marginBottom: theme.spacing(-1),
    },
    // Remove top margin on the first heading if it's the first child
    '& > div > *:first-of-type:not(* + *:first-of-type)': important({
        marginTop: 0,
    }),
}))

export default ContentContainer
