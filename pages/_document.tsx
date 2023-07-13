import { ReactElement } from 'react'

import { Head, Html, Main, NextScript } from 'next/document'

const CustomDocument = (): ReactElement => (
    <Html lang="en">
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            {/* Fonts are inlined for optimization, see https://nextjs.org/docs/basic-features/font-optimization */}
            <link rel="stylesheet" href="https://use.typekit.net/xty1vma.css" />
            {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" /> */}
            {/* Do not show the icon text before the font has loaded! */}
            {/* eslint-disable-next-line @next/next/google-font-display */}
            <link
                rel="stylesheet"
                // This has to be on a single line so that the compiler can optimize the font
                // eslint-disable-next-line max-len
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..40,400,0..1,0&display=block"
            />
        </Head>
        <body
            style={{
                overflow: 'hidden',
            }}
        >
            <Main />
            <NextScript />
        </body>
    </Html>
)

export default CustomDocument
