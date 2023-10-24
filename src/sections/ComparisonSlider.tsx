import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'

import { IComparisonSliderFields } from 'src/@types/contentful'
import Icon from 'src/general/Icon'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

const ComparisonSlider: FunctionComponent<IComparisonSliderFields> = ({
    title,
    description,
    topImage,
    bottomImage,
    backgroundColor,
    backgroundImage,
    isDarkMode,
    fadeType,
    sectionId,
}) => {
    const [isResizing, setIsResizing] = useState(false)

    const topImageRef = useRef<any>()

    const handleRef = useRef<any>()

    const setPositioning = useCallback((x: any) => {
        const { left, width } = topImageRef.current.getBoundingClientRect()

        const handleWidth = handleRef.current.offsetWidth

        if (x >= left && x <= width + left - handleWidth) {
            handleRef.current.style.left = `${((x - left) / width) * 100}%`

            topImageRef.current.style.clipPath = `inset(0 ${100 - ((x - left) / width) * 100}% 0 0)`
        }
    }, [])

    const handleResize = useCallback(
        (event: any) => {
            if (event.clientX) {
                setPositioning(event.clientX)
            } else if (event.touches[0] && event.touches[0].clientX) {
                setPositioning(event.touches[0].clientX)
            }
        },
        [setPositioning]
    )

    // Set initial positioning on component mount
    useEffect(() => {
        const { left, width } = topImageRef.current.getBoundingClientRect()

        const handleWidth = handleRef.current.offsetWidth

        setPositioning(width / 2 + left - handleWidth / 2)
    }, [setPositioning])

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false)

        window.removeEventListener('mousemove', handleResize)

        window.removeEventListener('touchmove', handleResize)

        window.removeEventListener('mouseup', handleResizeEnd)

        window.removeEventListener('touchend', handleResizeEnd)
    }, [handleResize])

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { offsetLeft, offsetParent } = handleRef.current

            if (event.code === 'ArrowLeft') {
                setPositioning(offsetLeft + offsetParent.offsetLeft - 10)
            }

            if (event.code === 'ArrowRight') {
                setPositioning(offsetLeft + offsetParent.offsetLeft + 10)
            }
        },
        [setPositioning]
    )

    // Add keydown event on mount
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleResize)

            window.addEventListener('touchmove', handleResize)

            window.addEventListener('mouseup', handleResizeEnd)

            window.addEventListener('touchend', handleResizeEnd)
        }

        return () => {
            window.removeEventListener('mousemove', handleResize)

            window.addEventListener('touchmove', handleResize)

            window.removeEventListener('mouseup', handleResizeEnd)

            window.removeEventListener('touchend', handleResizeEnd)

            window.removeEventListener('keyup', onKeyDown)
        }
    }, [isResizing, handleResize, handleResizeEnd, onKeyDown])

    return (
        <Section
            maxWidth="xl"
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage as Asset}
            fadeType={fadeType}
            id={sectionId}
        >
            <Box
                component="div"
                mb={4}
                sx={{
                    color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary,
                    [theme.breakpoints.up('md')]: {
                        maxWidth: '65%',
                    },
                }}
            >
                <Typography variant="h3">{title}</Typography>
                {description ? documentToReactComponents(description) : null}
            </Box>
            <Box
                sx={{
                    margin: 'auto',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    ref={handleRef}
                    sx={{
                        position: 'absolute',
                        width: '3px',
                        height: '100%',
                        background: 'lightgray',
                        opacity: '50%',
                        zIndex: 3,
                        cursor: 'col-resize',
                        top: 0,
                    }}
                    onMouseDown={(): void => setIsResizing(true)}
                    onTouchStart={(): void => setIsResizing(true)}
                >
                    <Icon
                        sx={{
                            display: 'block',
                            position: 'absolute',
                            top: 'calc(50% - 23px)',
                            right: 'calc(50% - 23px)',
                            background: 'lightgray',
                            borderRadius: '8px',
                            padding: '2px',
                        }}
                        name="compare_arrows"
                        size="large"
                    />
                </Box>
                <Box
                    ref={topImageRef}
                    sx={{
                        overflow: 'hidden',
                        zIndex: 1,
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        top: 0,
                    }}
                >
                    <img
                        style={{
                            height: '100%',
                            objectFit: 'cover',
                            width: '100%',
                            verticalAlign: 'middle',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            borderRadius: '22px',
                        }}
                        draggable="false"
                        src={topImage?.fields.file.url}
                        alt={topImage?.fields.title}
                    />
                </Box>
                <Box
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                            height: 'auto',
                            verticalAlign: 'middle',
                            userSelect: 'none',
                            pointerEvents: 'none',
                            borderRadius: '22px',
                        }}
                        draggable="false"
                        src={bottomImage?.fields.file.url}
                        alt={bottomImage?.fields.title}
                    />
                </Box>
            </Box>
        </Section>
    )
}

export default ComparisonSlider
