import { forwardRef } from 'react'

// eslint-disable-next-line no-restricted-imports
import { Link as MuiLink, LinkProps as MuiLinkProps, styled } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { Except } from 'type-fest'

import Icon from 'src/general/Icon'
import { Spacing } from 'src/general/utils/config'
import { getExternalLinkProps } from 'src/interactive/utils/getExternalLinkProps'
import { getIsExternalLink } from 'src/interactive/utils/getIsExternalLink'

interface CustomNextLinkProps extends Except<LinkProps, 'href' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
    href: string
}

interface ComposedLinkProps extends CustomNextLinkProps, Except<MuiLinkProps, 'href'> {}

// The `userSelect` and `contentEditable` are required for rich text editor not to break when
// focusing into the icon element
const ExternalIcon = styled(
    forwardRef<HTMLSpanElement>((props, ref) => (
        <Icon contentEditable={false} name="open_in_new" size={1} {...props} ref={ref} />
    )),
    {
        name: 'ExternalIcon',
    }
)(({ theme }) => ({
    marginLeft: theme.spacing(Spacing.Icons),
    userSelect: 'none',
    verticalAlign: 'text-bottom',
}))

/**
 * Next.js + MUI link.
 */
const ComposedLink = forwardRef<HTMLAnchorElement, ComposedLinkProps>((props, ref) => {
    const { children, href, ...rest } = props

    const isExternalLink = getIsExternalLink(props)

    return (
        <MuiLink
            component={Link}
            href={href}
            {...(isExternalLink && getExternalLinkProps())}
            {...rest}
            ref={ref}
            legacyBehavior={false}
        >
            {children}
            {isExternalLink ? <ExternalIcon /> : undefined}
        </MuiLink>
    )
})

export type { ComposedLinkProps, CustomNextLinkProps }

export default ComposedLink
