import { FunctionComponent, PropsWithChildren, useRef } from 'react'

import { Box, Typography } from '@mui/material'
import { Asset } from 'contentful'
import { motion, Variants } from 'framer-motion'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface OverflowImageProps {
    title: string
    description: string
    image: Asset
    backgroundColor?: string
    isDarkMode?: boolean
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const OverflowImage: FunctionComponent<PropsWithChildren<OverflowImageProps>> = ({
    title,
    description,
    image,
    backgroundColor,
    isDarkMode,
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

    return (
        <div ref={ref}>
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{
                    once: true,
                    amount: 0.5,
                }}
                ref={scrollRef}
            >
                <Section maxWidth="xl" id={sectionId} backgroundColor={backgroundColor}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'row',
                            },
                        }}
                    >
                        {sm ? (
                            <Typography
                                variant="h3"
                                align="center"
                                color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                            >
                                {title}
                            </Typography>
                        ) : null}
                        <Box
                            sx={{
                                maxWidth: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                [theme.breakpoints.up('md')]: {
                                    maxWidth: '50%',
                                    padding: '80px',
                                },
                            }}
                        >
                            {!sm ? (
                                <Typography
                                    variant="h3"
                                    color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                                >
                                    {title}
                                </Typography>
                            ) : null}
                            <Typography
                                variant="body1"
                                color={isDarkMode ? theme.palette.text.secondary : theme.palette.text.primary}
                            >
                                {description}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                maxWidth: '100%',
                                [theme.breakpoints.up('md')]: {
                                    maxWidth: '50%',
                                },
                            }}
                        >
                            {sm ? (
                                <img
                                    alt={image.fields.title}
                                    src={`https:${image.fields.file.url}`}
                                    width={image.fields.file.details.image?.width}
                                    height={image.fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                    }}
                                />
                            ) : (
                                <motion.img
                                    variants={cardVariants}
                                    alt={image.fields.title}
                                    src={`https:${image.fields.file.url}`}
                                    width={image.fields.file.details.image?.width}
                                    height={image.fields.file.details.image?.height}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Section>
            </motion.div>
        </div>
    )
}

export default OverflowImage
