import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

declare module 'slate' {
    interface CustomElement {
        align?: 'center' | 'justify' | 'left' | 'right'
        children: CustomText[]
        type: 'bulleted-list' | 'list-item' | 'numbered-list' | 'paragraph' | 'subtitle1' | 'subtitle2'
    }

    interface LinkElement {
        children: CustomText[]
        type: 'link'
        url: string
    }

    type CustomText = {
        bold?: boolean
        italic?: boolean
        text: string
        underline?: boolean
    }

    interface CustomTypes {
        Editor: BaseEditor & HistoryEditor & ReactEditor
        Element: CustomElement | LinkElement
        Node: CustomElement | LinkElement
        Text: CustomText
    }
}
