import { FunctionComponent, useRef } from 'react'

import { Typography } from '@mui/material'
import { motion, Variants } from 'framer-motion'
import { useResizeDetector } from 'react-resize-detector'

import { IProjectNavigationFields } from 'src/@types/contentful'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'

/**
 * Small image banner.
 */
const ProjectDisplay: FunctionComponent<IProjectNavigationFields> = ({ project, title, sectionId }) => {
    const { ref } = useResizeDetector()

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
            <Typography mb={2} variant="h2">
                {title}
            </Typography>
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
                                        title={page.fields.navigationTitle}
                                        description={page.fields.navigationDescription}
                                        keywords={page.fields.keywords}
                                        page={page.fields.slug as string}
                                        isInverted={index % 2 == 0 ? true : false}
                                    />
                                ) : null}
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </Section>
    )
}

export default ProjectDisplay
