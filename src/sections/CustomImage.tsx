import { forwardRef, RefObject } from 'react'

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

import { IImage } from 'src/@types/contentful'

interface CustomImageProps {
    image: IImage
    ref?: RefObject<HTMLInputElement>
}

const useParallax = (value: MotionValue<number>, distance: number): MotionValue => {
    let reverse = false

    if (typeof window !== 'undefined') {
        reverse = window.innerHeight > (document?.querySelector('#ref')?.clientHeight || Number.POSITIVE_INFINITY)
    }

    return useTransform(value, [0, 1], reverse ? [0, distance] : [distance, 0])
}

/**
 * Section to display an image and text component.
 */
const CustomImage = forwardRef<RefObject<HTMLInputElement>, CustomImageProps>((props, ref) => {
    const { image } = props

    const { scrollYProgress } = useScroll({
        target: ref as RefObject<HTMLElement>,
        layoutEffect: false,
    })

    const y = useParallax(scrollYProgress, 25)

    if (!image) {
        return null
    }

    if (image.fields.staticImage?.fields.file.url.includes('video')) {
        return (
            <video
                src={`https:${image.fields.staticImage?.fields.file.url}`}
                autoPlay
                muted
                playsInline
                loop
                style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 150px)',
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '36px',
                }}
            />
        )
    }

    return (
        <>
            {image.fields.staticImage ? (
                <Image
                    alt={image?.fields.staticImage.fields.title}
                    src={`https:${image?.fields.staticImage.fields.file.url}`}
                    width={image?.fields.staticImage.fields.file.details.image?.width}
                    height={image?.fields.staticImage.fields.file.details.image?.height}
                    style={{
                        maxWidth: '100%',
                        maxHeight: 'calc(100vh - 150px)',
                        height: 'auto',
                        width: 'auto',
                        borderRadius: '36px',
                    }}
                />
            ) : null}
            {image.fields.overlayImage !== undefined ? (
                <motion.img
                    alt={image?.fields.overlayImage.fields.title}
                    src={`https:${image?.fields.overlayImage.fields.file.url}`}
                    width={image?.fields.overlayImage.fields.file.details.image?.width}
                    height={image?.fields.overlayImage.fields.file.details.image?.height}
                    style={{
                        y,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        maxWidth: '100%',
                        maxHeight: 'calc(100vh - 150px)',
                        height: 'auto',
                        width: 'auto',
                        borderRadius: '36px',
                    }}
                />
            ) : null}
        </>
    )
})

export default CustomImage
