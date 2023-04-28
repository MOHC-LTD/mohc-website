import { FunctionComponent, PropsWithChildren, useRef } from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import { motion, Variants } from 'framer-motion'

import { IIconBox } from 'src/@types/contentful'
import Icon from 'src/general/Icon'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface IconBoxesProps {
    title: string
    color: string
    boxDetails: IIconBox[]
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const IconBoxes: FunctionComponent<PropsWithChildren<IconBoxesProps>> = ({ title, color, boxDetails, sectionId }) => {
    const scrollRef = useRef(null)

    const cardVariants: Variants = {
        offscreen: {
            x: 50,
            opacity: 0,
        },
        onscreen: {
            x: 0,
            opacity: 1,
        },
    }

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{
                once: true,
                amount: 0.5,
            }}
            ref={scrollRef}
        >
            <Section maxWidth="xl" id={sectionId}>
                <Typography variant="h3">{title}</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        [theme.breakpoints.up('md')]: {
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        },
                        [theme.breakpoints.up('xl')]: {
                            gridTemplateColumns: 'repeat(4, 1fr)',
                        },
                    }}
                >
                    {boxDetails?.map((box, index) => (
                        <motion.li
                            key={box.fields.title}
                            style={{
                                listStyleType: 'none',
                            }}
                            variants={cardVariants}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05,
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: color,
                                    margin: '10px',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon
                                    name={box.fields.iconName || 'square'}
                                    size="large"
                                    color="white"
                                    sx={{
                                        margin: '40px',
                                    }}
                                />
                                <Typography variant="body1" color="white" mb={2}>
                                    {box.fields.title}
                                </Typography>
                                <Typography variant="body2" align="center" color="white">
                                    {box.fields.description}
                                </Typography>
                            </Box>
                        </motion.li>
                    ))}
                </Box>
            </Section>
        </motion.div>
    )
}

export default IconBoxes
