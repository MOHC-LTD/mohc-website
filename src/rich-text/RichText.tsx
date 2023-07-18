import { FunctionComponent, useCallback, useMemo, useState } from 'react'

import { Typography } from '@mui/material'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react'

import ContentContainer from 'src/rich-text/ContentContainer'
import Element from 'src/rich-text/Element'
import Leaf from 'src/rich-text/Leaf'
import { withInlines } from 'src/rich-text/utils/withInlines'

type RichTextTypographyVariant = 'body1' | 'body2' | 'overline' | 'h1' | 'h2' | 'h3'

interface RichTextProps {
    value: Descendant[]
    variant?: RichTextTypographyVariant
}

const RichText: FunctionComponent<RichTextProps> = ({ value, variant = 'body1' }) => {
    const key = useMemo(() => {
        if (value === null) {
            return ''
        }

        return JSON.stringify(value)
    }, [value])

    const [editor] = useState(() => withInlines(withHistory(withReact(createEditor()))))

    const renderElement = useCallback((renderProps: RenderElementProps) => <Element {...renderProps} />, [])

    const renderLeaf = useCallback((renderProps: RenderLeafProps) => <Leaf {...renderProps} />, [])

    return (
        <Typography component="div" variant={variant}>
            <Slate key={key} editor={editor} value={value}>
                <ContentContainer>
                    <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
                </ContentContainer>
            </Slate>
        </Typography>
    )
}

export type { RichTextProps, RichTextTypographyVariant }

export default RichText
