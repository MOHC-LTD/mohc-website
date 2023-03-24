import { AnchorHTMLAttributes } from 'react'

const getIsExternalLink = ({
    href,
    target,
}: Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>): boolean =>
    (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) ||
    target === '_blank' ||
    target === '_parent'

export { getIsExternalLink }
