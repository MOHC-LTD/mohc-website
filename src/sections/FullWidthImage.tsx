import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'

import { IFullWidthImageFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import CustomImage from 'src/sections/CustomImage'
import { theme } from 'src/theme/theme.default'

/**
 * Full width image section.
 */
const FullWidthImage: FunctionComponent<IFullWidthImageFields> = ({
    backgroundColor,
    backgroundImage,
    fadeType = 'none',
    hasBorder,
    isDarkMode = false,
    title,
    description,
    image,
}) => {
    return (
        <Section
            maxWidth="xl"
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage as Asset}
            fadeType={fadeType}
        >
            {title || description ? (
                <Box
                    mb={4}
                    sx={{
                        color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                        [theme.breakpoints.up('md')]: {
                            maxWidth: '65%',
                        },
                    }}
                >
                    <Typography variant="h2">{title}</Typography>
                    {description ? documentToReactComponents(description) : null}
                </Box>
            ) : null}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {image ? <CustomImage image={image} hasBorder={hasBorder} /> : null}
            </Box>
        </Section>
    )
}

export default FullWidthImage
