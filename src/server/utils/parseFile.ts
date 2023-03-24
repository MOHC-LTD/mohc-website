import path from 'node:path'

interface ParseFile {
    (file: string): ParseFileReturn
}

interface ParseFileReturn {
    directory: string
    fileName: string
}

/**
 * Returns the file's last directory and file name without extension.
 */
const parseFile: ParseFile = (file) => {
    const parsed = path.parse(file)

    return {
        directory: parsed.dir.split(path.sep).pop() as string,
        fileName: parsed.base.replace(parsed.ext, ''),
    }
}

export type { ParseFile }

export { parseFile }
