import { forwardRef, FunctionComponent, HTMLAttributes } from 'react'

import { alpha, styled, Tooltip, Typography } from '@mui/material'
import { Text } from 'slate'
import { RenderElementProps, useSelected } from 'slate-react'
import { Except } from 'type-fest'

import BulletedList from 'src/general/BulletedList'
import { Spacing } from 'src/general/utils/config'
import ComposedLink, { ComposedLinkProps } from 'src/interactive/ComposedLink'

interface LinkElementProps extends ComposedLinkProps {
    selected?: boolean
}

// See https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = styled(
    forwardRef<HTMLSpanElement, Except<HTMLAttributes<HTMLSpanElement>, 'contentEditable'>>((props, ref) => (
        <span {...props} ref={ref} contentEditable={false}>
            {String.fromCodePoint(160)}
        </span>
    ))
)({
    fontSize: 0,
    userSelect: 'none',
})

const LinkElement = styled(
    forwardRef<HTMLAnchorElement, LinkElementProps>((props, ref) => {
        const { children, selected: _, ...rest } = props

        return (
            <ComposedLink {...rest} ref={ref}>
                <InlineChromiumBugfix />
                {children}
                <InlineChromiumBugfix />
            </ComposedLink>
        )
    }),
    {
        name: 'LinkElement',
    }
)(({ selected, theme }) => ({
    backgroundColor: alpha(theme.palette.divider, 0),
    border: `1px solid ${alpha(theme.palette.primary.main, 0)}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(-0.25),
    padding: theme.spacing(0.25),
    transition: theme.transitions.create(['background-color', 'border-color', 'color'], {
        duration: theme.transitions.duration.short,
    }),
    ...(selected && {
        '[contenteditable="true"] &': {
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,
            textDecorationColor: theme.palette.secondary.contrastText,
        },
    }),
}))

const Element: FunctionComponent<RenderElementProps> = ({ attributes, children, element }) => {
    const selected = useSelected()

    switch (element.type) {
        case 'subtitle1': {
            return (
                <Typography
                    align={element.align}
                    color="inherit"
                    gutterBottom
                    mt={Spacing.Card}
                    variant="subtitle1"
                    {...attributes}
                >
                    {children}
                </Typography>
            )
        }

        case 'subtitle2': {
            return (
                <Typography
                    align={element.align}
                    color="inherit"
                    gutterBottom
                    mt={Spacing.Card}
                    variant="subtitle2"
                    {...attributes}
                >
                    {children}
                </Typography>
            )
        }

        case 'bulleted-list': {
            return (
                <BulletedList gutterBottom textAlign={element.align} {...attributes}>
                    {children}
                </BulletedList>
            )
        }

        case 'numbered-list': {
            return (
                <BulletedList gutterBottom textAlign={element.align} variant="ol" {...attributes}>
                    {children}
                </BulletedList>
            )
        }

        case 'list-item': {
            return (
                <li {...attributes}>
                    <Typography textAlign={element.align}>{children}</Typography>
                </li>
            )
        }

        case 'link': {
            // If the text of the element is the same as the link URL, do not show a tooltip,
            // otherwise the tooltip shows what URL the element links to
            const textIsLink =
                element.children.length === 1 &&
                Text.isText(element.children[0]) &&
                element.children[0].text === element.url

            const link = (
                <LinkElement href={element.url} selected={selected} {...attributes}>
                    {children}
                </LinkElement>
            )

            return textIsLink ? link : <Tooltip title={element.url}>{link}</Tooltip>
        }

        default: {
            return (
                <Typography align={element.align} color="inherit" gutterBottom variant="inherit" {...attributes}>
                    {children}
                </Typography>
            )
        }
    }
}

export default Element
