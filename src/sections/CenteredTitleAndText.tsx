import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'

import Section from 'src/general/Section'
import { RichTextTypographyVariant } from 'src/rich-text/RichText'
import { theme } from 'src/theme/theme.default'

interface CenteredTitleAndTextProps {
    title: string
    text?: string
    backgroundColor?: string
    titleVariant?: RichTextTypographyVariant
    textVariant?: RichTextTypographyVariant
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
                {text ? (
                    <Typography variant={textVariant} align="center">
                        {text}
                    </Typography>
                ) : null}
            </Box>
        </Section>
    )
}

export default CenteredTitleAndText
