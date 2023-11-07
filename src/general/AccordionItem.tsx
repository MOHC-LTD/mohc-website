import { FunctionComponent, PropsWithChildren, useState } from 'react'

import { Box, ButtonBase, Collapse, collapseClasses, Stack, styled, Typography } from '@mui/material'

import { IAccordionItemFields } from 'src/@types/contentful'
import Icon from 'src/general/Icon'

const AccordionItemRoot = styled('div', {
    name: 'AccordionItemRoot',
})(() => ({
    borderBottom: '1px solid rgb(16, 16, 16, 0.2)',
    borderTop: '1px solid rgb(16, 16, 16, 0.2)',
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

const AccordionItem: FunctionComponent<PropsWithChildren<IAccordionItemFields>> = ({ children, header, icon }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <AccordionItemRoot>
            {header ? (
                <AccordionButton component="div" role="button" onClick={(): void => setExpanded(!expanded)}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {icon ? (
                            <Icon
                                name={icon}
                                filled={false}
                                size="large"
                                weight={200}
                                sx={{
                                    marginRight: '20px',
                                }}
                            />
                        ) : null}
                        <Typography pr={2} variant="h5">
                            {header}
                        </Typography>
                    </Box>
                    <Icon name={expanded ? 'remove' : 'add'} />
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
