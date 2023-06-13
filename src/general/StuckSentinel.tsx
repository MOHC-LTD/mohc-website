import { ElementType, FunctionComponent, ReactNode } from 'react'

import { Box, BoxProps } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { Except } from 'type-fest'

interface BaseProps {
    children: (props: StuckSentinelChildrenProps) => ReactNode
}

interface StuckSentinelChildrenProps {
    stuck: boolean
}

interface SentinelElementProps extends BaseProps {
    SentinelElement: ElementType
}

interface NoSentinelElementProps extends BaseProps, Except<BoxProps, 'component' | 'children'> {
    SentinelElement?: never
}

type StuckSentinelProps = SentinelElementProps | NoSentinelElementProps

/**
 * Creates a sentinel element which tracks whether the content is stuck based on whether the sentinel element
 * is on screen or not. Relies on CSS to correctly position the sentinel element and other elements.
 */
const StuckSentinel: FunctionComponent<StuckSentinelProps> = ({ SentinelElement, children, ...props }) => {
    const { ref, inView, entry } = useInView()

    return (
        <>
            {SentinelElement ? <SentinelElement ref={ref} /> : <Box component="div" {...props} ref={ref} />}
            {children({
                stuck: !inView && !!entry,
            })}
        </>
    )
}

export type { StuckSentinelProps }

export default StuckSentinel
