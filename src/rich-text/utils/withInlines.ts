import { Editor, Element } from 'slate'

const withInlines = (editor: Editor): Editor => {
    const { isInline } = editor

    editor.isInline = (element: Element): boolean => element.type === 'link' || isInline(element)

    // TODO: Fix this
    // Because when pasting a lot of paragraph with a link in the middle, every paragraph will become alink
    /*
    editor.insertText = (text): void => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = (data): void => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }
    */

    return editor
}

export { withInlines }
