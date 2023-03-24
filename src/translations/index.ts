import { loadEnvConfig } from '@next/env'
import { flatten } from 'flatten-anything'
import _glob from 'glob'
import { merge } from 'merge-anything'
import mkdirp from 'mkdirp'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import { parseFile } from 'src/server/utils/parseFile'
import config from 'src/translations/config.json'

const argv = yargs(hideBin(process.argv)).argv as Record<string, unknown>

loadEnvConfig(process.cwd())

const glob = promisify(_glob)

const getNamespaces = async (): Promise<Set<string>> => {
    const files = await glob('src/translations/default/en/*.json')

    return new Set(files.map((file) => parseFile(file).fileName))
}

const compile = async (): Promise<void> => {
    const { locales } = config.default

    const namespaces = await getNamespaces()

    for await (const locale of locales) {
        // Create directory into which the compiled translations files will be saved
        // Use the `npm run clean` script to prepare the `public` directory
        await mkdirp(`public/locales/${locale}`)

        for await (const namespace of namespaces) {
            const files = [
                // Always fallback to the default English translations
                `src/translations/default/en/${namespace}.json`,
            ]

            const translations = await Promise.allSettled<Record<string, unknown>>(
                files.map(async (file) => {
                    const { default: json } = await import(file)

                    return json
                })
            )

            const resolvedTranslations = translations
                .map((promise) => (promise.status === 'fulfilled' ? promise.value : undefined))
                .filter((value) => !!value) as unknown as Record<string, unknown>[]

            await writeFile(
                path.resolve(`public/locales/${locale}/${namespace}.json`),
                JSON.stringify(merge(resolvedTranslations[0], ...resolvedTranslations.slice(1))),
                'utf8'
            )
        }
    }
}

const lint = async (): Promise<void> => {
    const namespaces = await getNamespaces()

    for await (const namespace of namespaces) {
        const { default: defaultTranslations } = await import(`src/translations/default/en/${namespace}.json`)

        const defaultKeys = new Set(Object.keys(flatten(defaultTranslations)))

        // Ensure that the translations objects are not nested too deeply
        for (const key of defaultKeys) {
            if (key.split('.').length > 2) {
                const message =
                    `Translations key "${key}" in "${namespace}" namespace is too deeply nested.` +
                    'Please keep nesting to a maximum of 2 levels.'

                throw new Error(message)
            }
        }

        // Ensure that all translation keys in all other tenant and locale files exist in the
        // default English translations
        for await (const file of await glob(`src/translations/*/*/${namespace}.json`)) {
            const { default: translations } = await import(file)

            for (const key of Object.keys(flatten(translations))) {
                if (!defaultKeys.has(key)) {
                    throw new Error(`Invalid translations key "${key}" in file: ${file}`)
                }
            }
        }

        // Ensure that all other tenant and locale translation files exist in default English
        for (const file of await glob('src/translations/*/*/*.json')) {
            const { fileName } = parseFile(file)

            if (!namespaces.has(fileName)) {
                throw new Error(`Invalid translations namespace file: ${file}`)
            }
        }
    }
}

if (argv.lint) {
    lint()
}

if (argv.compile) {
    compile()
}
