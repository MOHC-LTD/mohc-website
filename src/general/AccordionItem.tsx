import { FunctionComponent, PropsWithChildren, useState } from 'react'

import { ButtonBase, Collapse, collapseClasses, Stack, styled, Typography } from '@mui/material'

import ExpandIcon from 'src/general/ExpandIcon'

interface AccordionItemProps {
    heading: string
}

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

const AccordionItem: FunctionComponent<PropsWithChildren<AccordionItemProps>> = ({ children, heading }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <AccordionItemRoot>
            {heading ? (
                <AccordionButton component="div" role="button" onClick={(): void => setExpanded(!expanded)}>
                    <Typography pr={2} variant="subtitle1">
                        {heading}
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

export type { AccordionItemProps }

export default AccordionItem
