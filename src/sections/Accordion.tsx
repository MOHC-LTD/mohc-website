import { FunctionComponent } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, styled, Typography } from '@mui/material'

import { IAccordionFields, IAccordionItemFields } from 'src/@types/contentful'
import AccordionItem from 'src/general/AccordionItem'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

const AccordionComponent = styled('div', {
    name: 'Accordion',
})({
    '& > :not(:last-child)': {
        borderBottom: 'none',
    },

    position: 'relative',
})

const Accordion: FunctionComponent<IAccordionFields> = ({
    title,
    subtitle,
    accordionItem,
    backgroundColor,
    isDarkMode,
}) => {
    return (
        <Section maxWidth="xl" backgroundColor={backgroundColor}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                    },
                }}
            >
                <Box
                    mr={5}
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            width: '35%',
                        },
                    }}
                >
                    <Typography mb={2} variant="h2">
                        {title}
                    </Typography>
                    {subtitle ? documentToReactComponents(subtitle) : null}
                </Box>
                <AccordionComponent
                    sx={{
                        [theme.breakpoints.up('md')]: {
                            width: '65%',
                        },
                    }}
                >
                    {accordionItem?.map((item) => {
                        const { header, content, icon }: IAccordionItemFields = item.fields

                        return (
                            <AccordionItem key={header} header={header} icon={icon}>
                                {content ? documentToReactComponents(content) : null}
                            </AccordionItem>
                        )
                    })}
                </AccordionComponent>
            </Box>
        </Section>
    )
}

export default Accordion
