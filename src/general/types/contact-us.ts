import { ReactNode } from 'react'

interface ContactUsFV {
    firstName: string
    lastName: string
    email: string
    budget: string
    project: string
}

interface ContactUsStepConfig {
    id: string | undefined
    renderStep: () => ReactNode
}

export type { ContactUsFV, ContactUsStepConfig }
