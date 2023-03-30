import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, styled, Typography } from '@mui/material'
import { Asset } from 'contentful'
import { motion } from 'framer-motion'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface AnimatedHeadingProps {
    title: string
    image: Asset
}

const container = {
    show: {
        transition: {},
    },
}

const itemAbove = {
    hidden: {
        opacity: 0,
        y: -1000,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        y: -1000,
        transition: {
            ease: 'easeIn',
            duration: 0.8,
        },
    },
}

const itemBelow = {
    hidden: {
        opacity: 0,
        y: 1000,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        y: 1000,
        transition: {
            ease: 'easeIn',
            duration: 0.8,
        },
    },
}

const imageItem = {
    hidden: {
        opacity: 0,
        x: -1000,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
        },
    },
    exit: {
        opacity: 0,
        x: -1000,
        transition: {
            ease: 'easeIn',
            duration: 0.8,
        },
    },
}

const MotionImage = styled(motion.div, {
    name: 'MotionImage',
})({
    maxWidth: '100%',
    margin: '10px',
    [theme.breakpoints.up('md')]: {
        maxWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '55%',
    },
})

const BlueRectangle = styled(motion.div, {
    name: 'BlueRectangle',
})({
    maxWidth: '100%',
    width: '50%',
    height: '80px',
    backgroundColor: 'blue',
    margin: '10px',
    [theme.breakpoints.up('md')]: {
        maxWidth: '10%',
        width: '100%',
        height: '500px',
    },
})

const BlackRectangle = styled(motion.div, {
    name: 'BlackRectangle',
})({
    width: '80px',
    height: '150px',
    backgroundColor: 'black',
    margin: '10px',
    [theme.breakpoints.up('md')]: {
        width: 'auto',
        height: '300px',
    },
})

/**
 * Animated heading section.
 */
const AnimatedHeading: FunctionComponent<PropsWithChildren<AnimatedHeadingProps>> = ({ title, image }) => {
    return (
        <Section maxWidth="xl" isFullScreen>
            <motion.div variants={container} initial="hidden" animate="show" exit="exit">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        },
                    }}
                >
                    <MotionImage variants={imageItem}>
                        <img
                            alt={image.fields.title}
                            src={image.fields.file.url}
                            width={image.fields.file.details.image?.width}
                            height={image.fields.file.details.image?.height}
                            style={{
                                maxWidth: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </MotionImage>
                    <Box
                        sx={{
                            display: 'flex',
                            maxWidth: '50%',
                            [theme.breakpoints.up('md')]: {
                                flexDirection: 'column',
                                maxWidth: '45%',
                            },
                            [theme.breakpoints.up('lg')]: {
                                flexDirection: 'column',
                                maxWidth: '40%',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                order: 2,
                                [theme.breakpoints.up('md')]: {
                                    order: 1,
                                },
                            }}
                        >
                            <motion.div variants={itemAbove} initial="hidden" animate="show" exit="exit">
                                <Typography variant="h3" margin="20px">
                                    {title}
                                </Typography>
                            </motion.div>
                        </Box>
                        <Box
                            sx={{
                                order: 1,
                                [theme.breakpoints.up('md')]: {
                                    order: 2,
                                },
                            }}
                        >
                            <BlackRectangle variants={itemBelow} initial="hidden" animate="show" exit="exit" />
                        </Box>
                    </Box>
                    <BlueRectangle variants={itemAbove} initial="hidden" animate="show" exit="exit" />
                </Box>
            </motion.div>
        </Section>
    )
}

export default AnimatedHeading
