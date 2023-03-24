import { FunctionComponent, PropsWithChildren, ReactNode, useEffect, useState } from 'react'

interface DelayedRenderProps {
    fallback?: ReactNode
    timeout?: number
    visible: boolean
}

/**
 * Renders its children after a delay specified by `timeout` when the `visible` is truthy. If the `visible` becomes
 * falsy before the children are rendered, they are not rendered at all and the timeout is cleared.
 *
 * Can optionally provide a `fallback` which is rendered whenever the `children` are not currently being rendered.
 */
const DelayedRender: FunctionComponent<PropsWithChildren<DelayedRenderProps>> = ({
    children,
    fallback,
    timeout = 1000,
    visible,
}) => {
    const [visibleState, setVisibleState] = useState(false)

    useEffect(() => {
        if (visible) {
            const timeoutId = setTimeout(() => {
                setVisibleState(true)
            }, timeout)

            return () => {
                clearTimeout(timeoutId)
            }
        }

        setVisibleState(false)

        return undefined
    }, [visible, timeout])

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{visibleState ? children : fallback}</>
}

export type { DelayedRenderProps }

export default DelayedRender
