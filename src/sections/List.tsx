import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'

import { IListFields, IListItemFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * List section.
 */
const List: FunctionComponent<IListFields> = ({ title, listItems }) => {
    return (
        <Section maxWidth="xl">
            <Typography mb={4} variant="h3">
                {title as string}
            </Typography>
            {listItems ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: '100%',
                        [theme.breakpoints.up('md')]: {
                            maxWidth: `${100 - (8 - listItems.length) * 12.5}%`,
                        },
                    }}
                >
                    {listItems?.map((listItem) => {
                        const { title: listItemTitle, subtitle }: IListItemFields = listItem.fields

                        return (
                            <Box
                                key={listItemTitle}
                                mb={2}
                                pr={2}
                                sx={{
                                    width: '50%',
                                    [theme.breakpoints.up('md')]: {
                                        width: `${100 / (listItems.length / 2)}%`,
                                    },
                                }}
                            >
                                <Typography variant="subtitle2">{listItemTitle}</Typography>
                                <Typography variant="body1">{subtitle}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            ) : null}
        </Section>
    )
}

export default List
