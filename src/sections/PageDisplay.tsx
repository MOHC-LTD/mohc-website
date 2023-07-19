import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { IPageCardFields, IPageNavigationFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Small image banner.
 */
const PageDisplay: FunctionComponent<IPageNavigationFields> = ({ pageCard }) => {
    return (
        <Section maxWidth="xl">
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                    },
                }}
            >
                {pageCard?.map((card) => {
                    const { title, description, image, link, linkText }: IPageCardFields = card.fields

                    return (
                        <Box
                            component="div"
                            p={2}
                            key={title}
                            sx={{
                                [theme.breakpoints.up('md')]: {
                                    width: '50%',
                                },
                            }}
                        >
                            <Image
                                alt={image?.fields.title || ''}
                                src={`https:${image?.fields.file.url}`}
                                width={image?.fields.file.details.image?.width}
                                height={image?.fields.file.details.image?.height}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                }}
                            />
                            <Typography variant="h5" my={1}>
                                {title}
                            </Typography>
                            {description ? documentToReactComponents(description) : null}
                            <Link
                                href={`/work/${link}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Typography>{linkText}</Typography>
                            </Link>
                        </Box>
                    )
                })}
            </Box>
        </Section>
    )
}

export default PageDisplay
