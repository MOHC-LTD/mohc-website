import { useEffect, useState } from 'react'

const getWindowDimensions = (): any => {
    const { innerWidth: width, innerHeight: height } = window

    return {
        width,
        height,
    }
}

export const useWindowDimensions = (): any => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        const handleResize = (): void => {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)

        return (): void => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}
