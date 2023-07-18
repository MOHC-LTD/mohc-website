import { FunctionComponent, useRef } from 'react'

import { Box, Divider, Typography } from '@mui/material'
import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useResizeDetector } from 'react-resize-detector'

import { IProjectNavigationFields } from 'src/@types/contentful'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'
import { fontFamilyConfig } from 'src/theme/theme.default'

/**
 * Small image banner.
 */
const ProjectDisplay: FunctionComponent<IProjectNavigationFields> = ({ project, title, footer, sectionId }) => {
    const { height, ref } = useResizeDetector()

    const { ref: inViewRef, inView } = useInView()

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
        <Section maxWidth="xl" id={sectionId}>
            <Typography marginBottom="10px" align="center">
                {title}
            </Typography>
            <Divider
                orientation="vertical"
                sx={{
                    position: 'absolute',
                    left: '50%',
                    height: `${height ? height + 60 : 0}px`,
                    borderStyle: 'dashed',
                }}
            />
            <div ref={ref}>
                {project?.map((page, index) => {
                    return (
                        <motion.div
                            id="ref"
                            key={page.fields.navigationTitle as string}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{
                                once: true,
                                amount: 0.5,
                            }}
                            ref={scrollRef}
                        >
                            <motion.div variants={cardVariants}>
                                {page.fields.navigationImage &&
                                page.fields.navigationImage.fields.file.details.image ? (
                                    <ProjectDrawer
                                        image={page.fields.navigationImage.fields.file.url}
                                        width={page.fields.navigationImage.fields.file.details.image.width}
                                        height={page.fields.navigationImage.fields.file.details.image.height}
                                        title={page.fields.navigationTitle as string}
                                        description={page.fields.navigationDescription as string}
                                        page={page.fields.slug as string}
                                        isInverted={index % 2 == 0 ? true : false}
                                    />
                                ) : null}
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
            <div ref={inViewRef}>
                <Box
                    component="div"
                    sx={{
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <Typography
                        mt={4}
                        align="center"
                        sx={{
                            '@keyframes code': {
                                '0%': {
                                    fontFamily: 'monospace',
                                    width: '22ch',
                                },
                                '33%': {
                                    width: 0,
                                },
                                '66%': {
                                    width: 0,
                                },
                                '100%': {
                                    fontFamily: fontFamilyConfig.name,
                                    width: '18ch',
                                },
                            },
                            '@keyframes blink3': {
                                '50%': {
                                    borderColor: 'transparent',
                                },
                            },
                            fontFamily: 'monospace',
                            width: '22ch',
                            animation: inView
                                ? 'code 4s steps(18) 2s forwards, blink3 .5s step-end 10s infinite alternate'
                                : 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            borderRight: '3px solid',
                        }}
                    >
                        {footer}
                    </Typography>
                </Box>
            </div>
        </Section>
    )
}

export default ProjectDisplay
