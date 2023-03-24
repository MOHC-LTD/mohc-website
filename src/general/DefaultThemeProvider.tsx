import { FunctionComponent, PropsWithChildren } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { globalStyles } from 'src/general/utils/globalStyles'
import { theme } from 'src/theme/theme.default'

const DefaultThemeProvider: FunctionComponent<PropsWithChildren<unknown>> = ({ children }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
    </ThemeProvider>
)

export default DefaultThemeProvider
