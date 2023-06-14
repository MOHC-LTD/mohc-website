import { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react'

import { Box, styled } from '@mui/material'
import { Asset } from 'contentful'
import { motion } from 'framer-motion'

interface ImageSliderProps {
    images: Asset[]
}

const ImageList = styled(motion.ul, {
    name: 'ImageList',
})({
    display: 'flex',
    listStyle: 'none',
    willChange: 'transform',

    '&:hover': {
        cursor: 'grab',
    },

    '&:active': {
        cursor: 'grabbing',
    },

    li: {
        '&:not(:last-of-type)': {
            marginRight: '40px',
        },

        div: {
            height: '680px',
            width: '996px',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            userSelect: 'none',
        },
    },
})

const ImageSlider: FunctionComponent<PropsWithChildren<ImageSliderProps>> = ({ images }) => {
    const sliderRef = useRef<any>(null)

    const slidesRef = useRef<any>(null)

    const [sliderWidth, setSliderWidths] = useState(0)

    const [slidesWidth, setSlidesWidths] = useState(0)

    const slideMarginRight = 15

    const totalSlidesMarginRight = slideMarginRight * images.length

    let slides: HTMLElement | null

    useEffect(() => {
        slides = document.querySelector('#slides') || null
    })

    useEffect(() => {
        const measureSliderWidth = (): void => {
            setSliderWidths(sliderRef.current.clientWidth)
        }

        const measureSlidesWidth = (): void => {
            const slidesNode = slidesRef.current.childNodes

            const slidesArray = [...slidesNode]

            const slidesSumWidth: any = slidesArray.reduce(
                (accumulator, node: any) => accumulator + node.clientWidth,
                0
            )

            setSlidesWidths(slidesSumWidth)
        }

        measureSliderWidth()

        measureSlidesWidth()

        window.addEventListener('resize', measureSliderWidth)

        window.addEventListener('resize', measureSlidesWidth)

        return () => {
            window.removeEventListener('resize', measureSliderWidth)

            window.removeEventListener('resize', measureSlidesWidth)
        }
    }, [sliderWidth, slidesWidth])

    return (
        <Box
            component="div"
            sx={{
                background: 'black',
            }}
        >
            <Box
                component="div"
                ref={sliderRef}
                id="slides"
                sx={{
                    maxWidth: '100%',
                    margin: '25px 0',
                    overflowX: 'hidden',
                    transition: '0.4s ease-out transform',

                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                }}
            >
                <ImageList
                    ref={slidesRef}
                    drag="x"
                    dragConstraints={{
                        left: -(slidesWidth - sliderWidth + totalSlidesMarginRight),
                        right: 0,
                    }}
                    dragElastic={0.2}
                    dragTransition={{
                        bounceDamping: 18,
                        timeConstant: 200,
                        power: 0.1,
                    }}
                    onDrag={(_event, info): void => {
                        slides ? (slides.style.transition = '0.4s ease-out transform') : null

                        if (info.delta.x < 0) {
                            slides ? (slides.style.transform = 'skewX(10deg)') : null
                        } else if (info.delta.x > 0) {
                            slides ? (slides.style.transform = 'skewX(-10deg)') : null
                        } else {
                            slides ? (slides.style.transform = 'skewX(0)') : null
                        }
                    }}
                    onDragEnd={(): void => {
                        slides ? (slides.style.transition = '0.4s ease-out transform') : null

                        slides ? (slides.style.transform = 'skewX(0)') : null
                    }}
                >
                    {images.map((image) => (
                        <li key={image.fields.title}>
                            <div
                                style={{
                                    backgroundImage: `url(${image.fields.file.url})`,
                                    borderRadius: '14px',
                                }}
                            />
                        </li>
                    ))}
                </ImageList>
            </Box>
        </Box>
    )
}

export default ImageSlider
