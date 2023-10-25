import { Children, FunctionComponent, isValidElement, PropsWithChildren } from 'react'

import { Box, Stack, styled, Tooltip } from '@mui/material'
import is, { assert } from '@sindresorhus/is'

import { Spacing } from 'src/general/utils/config'

interface IconButtonsStackProps {
    edge?: 'start' | 'end' | 'both' | false
}

const IconButtonContainer = styled('div', {
    name: 'IconButtonContainer',
    // Ensure that there is only one element with the button's aria label on the page
    shouldForwardProp: (prop) => prop !== 'aria-label',
})(() => ({
    display: 'flex',
}))

/**
 * Use to display a single icon button or group multiple icon buttons while correctly preserving their edge
 * negative margins.
 */
const IconButtonsStack: FunctionComponent<PropsWithChildren<IconButtonsStackProps>> = ({ edge, children }) => {
    if (is.emptyArray(Children.toArray(children))) {
        return null
    }

    return (
        <Box display="flex">
            <Stack
                spacing={Spacing.Icons}
                direction="row"
                alignItems="center"
                ml={edge === 'both' || edge === 'start' ? -1.5 : 0}
                mr={edge === 'both' || edge === 'end' ? -1.5 : 0}
            >
                {Children.map(children, (child) => {
                    // Do nothing for non-element children
                    if (!isValidElement(child)) {
                        return null
                    }

                    // Skip aria label check and tooltip if this attribute exists. Only use if you know what you are
                    // doing and the icon button has a valid tooltip and aria label specified in another way
                    // (for example a nested component).
                    if (child.props['data-ignore-tooltip']) {
                        return <IconButtonContainer>{child}</IconButtonContainer>
                    }

                    assert.nonEmptyStringAndNotWhitespace(child.props['aria-label'])

                    return (
                        <Tooltip title={child.props['aria-label']}>
                            <IconButtonContainer>{child}</IconButtonContainer>
                        </Tooltip>
                    )
                })}
            </Stack>
        </Box>
    )
}

export type { IconButtonsStackProps }

export default IconButtonsStack
