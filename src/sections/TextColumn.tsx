import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { Box, Typography } from '@mui/material'
import { Entry } from 'contentful'

import { ITextColumnList, ITextColumnTextBlock } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface TextColumnProps {
    section: Entry<{ [fieldId: string]: unknown }>
}

const TextColumn: FunctionComponent<TextColumnProps> = ({ section }) => {
    return (
        <Section maxWidth="xl" id={section.fields.sectionId as string}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    },
                }}
            >
                {[1, 2].map((number) => {
                    const textColumn = section.fields[`textColumn${number}Content`] as
                        | ITextColumnTextBlock
                        | ITextColumnList
                        | undefined

                    return (textColumn as ITextColumnTextBlock)?.fields.textBlock ? (
                        <Box
                            key={number}
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h2">{section.fields[`column${number}Title`] as string}</Typography>
                            {documentToReactComponents(
                                (textColumn as ITextColumnTextBlock)?.fields.textBlock as Document
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                marginBottom: '20px',
                                [theme.breakpoints.up('md')]: {
                                    width: '40%',
                                },
                            }}
                        >
                            <Typography variant="h2">{section.fields[`column${number}Title`] as string}</Typography>
                            <Box
                                mt={2}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    {(textColumn as ITextColumnList)?.fields?.listItems?.map((item: string) => (
                                        <Typography mb={2} key={item}>
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box>
                                    {(textColumn as ITextColumnList)?.fields?.listItems2?.map((item: string) => (
                                        <Typography mb={2} key={item}>
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Section>
    )
}

export default TextColumn
