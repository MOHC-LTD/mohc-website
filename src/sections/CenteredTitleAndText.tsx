import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import Section from '../general/Section'
import { theme } from 'src/theme/theme.default'

interface CenteredTitleAndTextProps {
    title: string
    text?: string
    backgroundColor?: string
    titleVariant?: string
    textVariant?: string
    sectionId?: string
}

/**
 * Section to display a centered title and text component.
 */
const CenteredTitleAndText: FunctionComponent<PropsWithChildren<CenteredTitleAndTextProps>> = ({
    title,
    text,
    backgroundColor = theme.palette.background.default,
    titleVariant = 'h3',
    textVariant = 'body1',
    sectionId,
}) => {
    return (
        <Section maxWidth="xl" id={sectionId} backgroundColor={backgroundColor}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant={titleVariant} align="center">
                    {title}
                </Typography>
                {text && (
                    <Typography variant={textVariant} align="center">
                        {text}
                    </Typography>
                )}
            </Box>
        </Section>
    )
}

export default CenteredTitleAndText
