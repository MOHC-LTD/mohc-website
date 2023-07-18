import { FunctionComponent, PropsWithChildren, useState } from 'react'

import { ButtonBase, Collapse, collapseClasses, Stack, styled, Typography } from '@mui/material'

import { IAccordionItemFields } from 'src/@types/contentful'
import ExpandIcon from 'src/general/ExpandIcon'

const AccordionItemRoot = styled('div', {
    name: 'AccordionItemRoot',
})(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    [`.${collapseClasses.root}`]: {
        // Clip only the y axis
        clipPath: 'inset(0 -100vw)',

        overflow: 'unset',
    },
}))

const AccordionButton = styled(ButtonBase, {
    name: 'AccordionButton',
})(({ theme }) => ({
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    textAlign: 'left',
    width: '100%',
})) as typeof ButtonBase

const AccordionItem: FunctionComponent<PropsWithChildren<IAccordionItemFields>> = ({ children, header }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <AccordionItemRoot>
            {header ? (
                <AccordionButton component="div" role="button" onClick={(): void => setExpanded(!expanded)}>
                    <Typography pr={2} variant="subtitle1">
                        {header}
                    </Typography>
                    <ExpandIcon expanded={expanded} />
                </AccordionButton>
            ) : undefined}
            <Collapse in={expanded}>
                <Stack pb={2} px={2} spacing={2}>
                    {children}
                </Stack>
            </Collapse>
        </AccordionItemRoot>
    )
}

export default AccordionItem
