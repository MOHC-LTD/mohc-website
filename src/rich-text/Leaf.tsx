import { FunctionComponent } from 'react'

import { Box } from '@mui/material'
import { RenderLeafProps } from 'slate-react'
import { Except } from 'type-fest'

const Leaf: FunctionComponent<Except<RenderLeafProps, 'text'>> = ({ attributes, children, leaf }) => (
    <Box
        component="span"
        fontStyle={leaf.italic ? 'italic' : undefined}
        fontWeight={leaf.bold ? 'medium' : undefined}
        sx={{
            textDecoration: leaf.underline ? 'underline' : undefined,
        }}
        {...attributes}
    >
        {children}
    </Box>
)

export default Leaf
