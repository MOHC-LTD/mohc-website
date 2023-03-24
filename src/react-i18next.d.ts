import 'react-i18next'

import { resources } from 'src/translations/resources'

declare module 'react-i18next' {
    interface CustomTypeOptions {
        resources: typeof resources
    }
}
