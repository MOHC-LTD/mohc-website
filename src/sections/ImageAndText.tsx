import { FunctionComponent, useRef } from 'react'

import { Box, styled, Typography } from '@mui/material'
import { motion, Variants } from 'framer-motion'
import { useResizeDetector } from 'react-resize-detector'

import { IImageAndTextFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import CustomImage from 'src/sections/CustomImage'
import { theme } from 'src/theme/theme.default'

interface ImageBoxProps {
    isInverted?: boolean
}

const ImageBox = styled(motion.div, {
    name: 'ImageBox',
    shouldForwardProp: (prop) => prop !== 'isInverted',
})<ImageBoxProps>(({ isInverted }) => ({
    position: 'relative',
    maxWidth: '100%',
    order: 1,
    [theme.breakpoints.up('md')]: {
        order: isInverted ? 1 : 2,
        display: 'flex',
        height: 'fit-content',
        maxWidth: '50%',
    },
}))

/**
 * Section to display an image and text component.
 */
const ImageAndText: FunctionComponent<IImageAndTextFields> = ({
    title,
    description,
    image,
    backgroundColor,
    backgroundImage,
    isDarkMode,
    isAnimated,
    isInverted,
    fadeType,
    sectionId,
}) => {
    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const scrollRef = useRef(null)

    const cardVariants: Variants = {
        offscreen: {
            y: 500,
            opacity: 0,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                bounce: 0.2,
                duration: 1.5,
            },
        },
    }

    const content = (
        <Section
            maxWidth="xl"
            id={sectionId}
            backgroundColor={backgroundColor}
            fadeType={fadeType}
            backgroundImage={backgroundImage}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        alignItems: 'center',
                        flexDirection: 'row',
                    },
                }}
            >
                {sm ? (
                    <Typography
                        mb={2}
                        variant="h3"
                        align="center"
                        color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                    >
                        {title}
                    </Typography>
                ) : null}
                <Box
                    component="div"
                    sx={{
                        maxWidth: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        order: 2,
                        [theme.breakpoints.up('md')]: {
                            order: isInverted ? 2 : 1,
                            maxWidth: '50%',
                            padding: isInverted ? '40px 0 40px 80px' : '40px 80px 40px 0',
                        },
                    }}
                >
                    {!sm ? (
                        <Typography
                            variant="h5"
                            color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                        >
                            {title}
                        </Typography>
                    ) : null}
                    <Typography
                        mt={2}
                        variant="body1"
                        color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                    >
                        {description}
                    </Typography>
                </Box>
                {image ? (
                    <ImageBox variants={cardVariants} isInverted={isInverted}>
                        <CustomImage image={image} ref={scrollRef} />
                    </ImageBox>
                ) : null}
            </Box>
        </Section>
    )

    return (
        <div ref={ref}>
            {isAnimated && !sm ? (
                <motion.div
                    id="ref"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{
                        once: true,
                        amount: 0.5,
                    }}
                    ref={scrollRef}
                >
                    {content}
                </motion.div>
            ) : (
                <div ref={scrollRef} id="ref">
                    {content}
                </div>
            )}
        </div>
    )
}

export default ImageAndText
