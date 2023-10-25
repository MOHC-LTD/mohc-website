import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { IPageCardFields, IPageNavigationFields } from 'src/@types/contentful'
import IconLink from 'src/general/IconLink'
import Section from 'src/general/Section'
import { fontFamilyConfig, theme } from 'src/theme/theme.default'

/**
 * Small image banner.
 */
const PageDisplay: FunctionComponent<IPageNavigationFields> = ({ pageCard }) => {
    return (
        <Section maxWidth="xl">
            <Box
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
                                    borderRadius: '22px',
                                }}
                            />
                            <Typography variant="h3" my={1} fontWeight={fontFamilyConfig.weights.medium}>
                                {title}
                            </Typography>
                            {description ? documentToReactComponents(description) : null}
                            <IconLink href={`/work/${link}`}>
                                <Typography fontWeight={fontFamilyConfig.weights.medium}>{linkText}</Typography>
                            </IconLink>
                        </Box>
                    )
                })}
            </Box>
        </Section>
    )
}

export default PageDisplay
