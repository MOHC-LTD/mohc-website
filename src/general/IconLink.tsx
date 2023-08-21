import { FunctionComponent, PropsWithChildren } from 'react'

import Link from 'next/link'

import Icon from 'src/general/Icon'

interface IconLinkProps {
    href: string
}

/**
 * Section to display a component to link to the next and previous project.
 */
const IconLink: FunctionComponent<PropsWithChildren<IconLinkProps>> = ({ href, children }) => {
    return (
        <Link
            href={href}
            style={{
                textDecoration: 'none',
                display: 'flex',
                color: '#3F69FF',
            }}
        >
            {children}
            <Icon
                name="arrow_forward"
                style={{
                    marginLeft: '5px',
                }}
            />
        </Link>
    )
}

export default IconLink
