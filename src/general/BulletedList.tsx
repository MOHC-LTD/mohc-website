import { forwardRef } from 'react'

import { Stack, StackProps, styled } from '@mui/material'

import { Spacing } from 'src/general/utils/config'

interface BulletedListProps extends StackProps<'ul'> {
    gutterBottom?: boolean
    noListStyle?: boolean
    variant?: 'ol' | 'ul'
}

const BulletedList = styled(
    forwardRef<HTMLOListElement | HTMLUListElement, BulletedListProps>(
        ({ variant = 'ul', spacing = Spacing.List / 2, noListStyle: _, gutterBottom: __, ...props }, ref) => (
            <Stack component={variant} spacing={spacing} {...props} ref={ref} />
        )
    ),
    {
        name: 'List',
    }
)(({ gutterBottom, noListStyle, theme }) => ({
    // 2.5 is just the amount of space needed to accommodate for the bullet points on the side of the list
    margin: theme.spacing(0, 0, gutterBottom ? Spacing.TypographyGutter : 0, 2.5),
    padding: 0,
    ...(noListStyle && {
        listStyle: 'none',
        margin: 0,
    }),
}))

export type { BulletedListProps }

export default BulletedList
