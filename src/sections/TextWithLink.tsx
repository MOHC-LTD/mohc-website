import { Box, Link, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import Section from '../general/Section'
import { theme } from 'src/theme/theme.default'

interface TextWithLinkProps {
    text: string
    linkText: string
    link: string
    sectionId?: string
}

/**
 * Section to display a text and link component.
 */
const TextWithLink: FunctionComponent<PropsWithChildren<TextWithLinkProps>> = ({ text, linkText, link, sectionId }) => {
    return (
        <Section maxWidth="xl" backgroundColor={theme.palette.primary.main} id={sectionId}>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ background: 'secondary', marginBottom: '20px' }}
            >
                <Typography variant="h3" color={theme.palette.text.secondary}>
                    {text}
                </Typography>
            </Box>
            <Link href={link} color={theme.palette.text.secondary}>
                {linkText}
            </Link>
        </Section>
    )
}

export default TextWithLink
