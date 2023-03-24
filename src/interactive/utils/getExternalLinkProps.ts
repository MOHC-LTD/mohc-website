import { AnchorHTMLAttributes } from 'react'

const getExternalLinkProps = (): Required<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'rel' | 'target'>> => ({
    rel: 'noopener noreferrer',
    target: '_blank',
})

export { getExternalLinkProps }
