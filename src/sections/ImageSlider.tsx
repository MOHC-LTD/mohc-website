import React, { useRef, useState, useEffect, FunctionComponent, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
import { StaticImageData } from 'next/dist/client/image'
import { Box, styled } from '@mui/material'

interface imageSlide {
    id: number
    imageSrc: StaticImageData
}

interface ImageSliderProps {
    images: imageSlide[]
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
    const sliderRef = useRef(null)
    const slidesRef = useRef(null)

    const [sliderWidth, setSliderWidths] = useState(0)
    const [slidesWidth, setSlidesWidths] = useState(0)

    const slideMarginRight = 15
    const totalSlidesMarginRight = slideMarginRight * images.length

    let slides: HTMLElement | null

    useEffect(() => {
        slides = document.getElementById('slides') || null
    })

    useEffect(() => {
        const measureSliderWidth = () => {
            setSliderWidths(sliderRef.current.clientWidth)
        }

        const measureSlidesWidth = () => {
            const slidesNode = slidesRef.current.childNodes
            const slidesArr = Array.from(slidesNode)
            const slidesSumWidth = slidesArr.reduce((acc, node) => acc + node.clientWidth, 0)
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
            sx={{
                background: 'black',
            }}
        >
            <Box
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
                    dragTransition={{ bounceDamping: 18, timeConstant: 200, power: 0.1 }}
                    onDrag={(event, info) => {
                        slides ? (slides.style.transition = '0.4s ease-out transform') : null
                        if (info.delta.x < 0) {
                            slides ? (slides.style.transform = 'skewX(10deg)') : null
                        } else if (info.delta.x > 0) {
                            slides ? (slides.style.transform = 'skewX(-10deg)') : null
                        } else {
                            slides ? (slides.style.transform = 'skewX(0)') : null
                        }
                    }}
                    onDragEnd={() => {
                        slides ? (slides.style.transition = '0.4s ease-out transform') : null
                        slides ? (slides.style.transform = 'skewX(0)') : null
                    }}
                >
                    {images.map((image) => (
                        <li key={image.id}>
                            <div style={{ backgroundImage: `url(${image.imageSrc.src})` }} />
                        </li>
                    ))}
                </ImageList>
            </Box>
        </Box>
    )
}

export default ImageSlider
