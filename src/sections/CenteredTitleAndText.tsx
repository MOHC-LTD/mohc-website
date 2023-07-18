import { FunctionComponent } from 'react'

import { Box, Typography } from '@mui/material'

import { ICenteredTitleAndTextFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Section to display a centered title and text component.
 */
const CenteredTitleAndText: FunctionComponent<ICenteredTitleAndTextFields> = ({
    title,
    text,
    backgroundColor = theme.palette.background.default,
    titleVariant = 'h5',
    textVariant = 'body1',
    isCentered = true,
    isDarkMode = false,
    sectionId,
}) => {
    return (
        <Section maxWidth="xl" id={sectionId} backgroundColor={backgroundColor}>
            <Box
                component="div"
                my={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCentered ? 'center' : 'flex-start',
                    [theme.breakpoints.up('md')]: {
                        maxWidth: isCentered ? '100%' : '65%',
                    },
                }}
            >
                <Typography
                    mb={2}
                    variant={titleVariant}
                    align={isCentered ? 'center' : 'left'}
                    color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                >
                    {title}
                </Typography>
                {text ? (
                    <Typography
                        variant={textVariant}
                        align={isCentered ? 'center' : 'left'}
                        color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                    >
                        {text}
                    </Typography>
                ) : null}
            </Box>
        </Section>
    )
}

export default CenteredTitleAndText
