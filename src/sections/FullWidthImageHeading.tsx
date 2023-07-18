import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'

import { IImage } from 'src/@types/contentful'
import Section from 'src/general/Section'
import CustomImage from 'src/sections/CustomImage'
import { theme } from 'src/theme/theme.default'

interface FullWidthImageHeadingProps {
    title?: string
    image?: IImage
    color?: string
    fadeType?: string
    isDarkMode?: string
}

/**
 * Full width image heading section.
 */
const FullWidthImageHeading: FunctionComponent<FullWidthImageHeadingProps> = ({
    title,
    image,
    color,
    fadeType = 'none',
    isDarkMode = false,
}) => {
    return (
        <Section maxWidth="xl" backgroundColor={color} fadeType={fadeType}>
            <Box
                component="div"
                sx={{
                    minHeight: '300px',
                    maxHeight: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    component="div"
                    id="title"
                    mb={4}
                    sx={{
                        maxWidth: '65%',
                    }}
                >
                    <Typography
                        mb={1}
                        variant="h4"
                        color={isDarkMode ? theme.palette.background.default : theme.palette.text.primary}
                    >
                        {title}
                    </Typography>
                </Box>
                {image ? (
                    <Box
                        component="div"
                        sx={{
                            maxWidth: '100%',
                        }}
                    >
                        <CustomImage image={image} />
                    </Box>
                ) : null}
            </Box>
        </Section>
    )
}

export default FullWidthImageHeading
