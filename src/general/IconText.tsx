import { FunctionComponent, PropsWithChildren } from 'react'

import { Stack, styled, typographyClasses } from '@mui/material'

import Icon, { IconProps } from 'src/general/Icon'
import { Spacing } from 'src/general/utils/config'

const IconTextStack = styled(Stack, {
    name: 'IconTextStack',
})({
    // Inline the icon with the text
    [`.${typographyClasses.alignCenter} &`]: {
        display: 'inline',
        'span[role="img"]': {
            verticalAlign: 'bottom',
        },
    },
}) as typeof Stack

const TextContainer = styled('span', {
    name: 'TextContainer',
})({
    [`.${typographyClasses.noWrap} &`]: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
})

const IconText: FunctionComponent<PropsWithChildren<Partial<IconProps>>> = ({
    children,
    color,
    name = 'circle',
    size = 1.5,
    ...props
}) => (
    <IconTextStack component="span" direction="row" spacing={Spacing.Icons}>
        {/* Key to ensure icons do not transition between each other */}
        <Icon color={color} name={name} size={size} {...props} key={color} />
        <TextContainer
            sx={{
                lineHeight: size,
            }}
        >
            {children}
        </TextContainer>
    </IconTextStack>
)

export default IconText
