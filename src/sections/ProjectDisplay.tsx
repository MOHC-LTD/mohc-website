import { FunctionComponent, useRef } from 'react'

import { Box, Typography } from '@mui/material'
import { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'
import SwipeableViews from 'react-swipeable-views'

import { IProjectNavigationFields } from 'src/@types/contentful'
import IconLink from 'src/general/IconLink'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'
import { fontFamilyConfig, theme } from 'src/theme/theme.default'

/**
 * Small image banner.
 */
const ProjectDisplay: FunctionComponent<IProjectNavigationFields> = ({ project, title, isCarousel, sectionId }) => {
    const { t } = useTranslation()

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
            {isCarousel ? (
                <Box
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                        '&:hover': {
                            cursor: 'grab',
                        },
                        '&:active': {
                            cursor: 'grabbing',
                        },
                    }}
                >
                    <Section maxWidth="xl" id={sectionId}>
                        <Typography mb={2} variant="h2">
                            {title}
                        </Typography>
                        <SwipeableViews
                            enableMouseEvents
                            resistance
                            style={{
                                overflow: 'visible',
                                width: sm ? '100%' : '50%',
                            }}
                            slideStyle={{
                                width: '100%',
                            }}
                        >
                            {project?.map((page) => (
                                <Box component="div" key={page.fields.navigationTitle}>
                                    <Image
                                        src={`https:${page.fields.navigationImage?.fields.file.url}`}
                                        width={page.fields.navigationImage?.fields.file.details.image?.width}
                                        height={page.fields.navigationImage?.fields.file.details.image?.height}
                                        alt={page.fields.navigationTitle || ''}
                                        style={{
                                            display: 'block',
                                            position: 'relative',
                                            width: '100%',
                                            height: 'auto',
                                            minWidth: 0,
                                            objectFit: 'contain',
                                            paddingRight: '20px',
                                        }}
                                        loading="lazy"
                                    />
                                    <Typography
                                        my={2}
                                        variant="h3"
                                        color={theme.palette.text.primary}
                                        fontWeight={fontFamilyConfig.weights.medium}
                                    >
                                        {page.fields.navigationTitle}
                                    </Typography>
                                    <IconLink href={`/project/${page.fields.slug}`}>
                                        <Typography fontWeight={fontFamilyConfig.weights.medium}>
                                            {t('home:our_work.view_project')}
                                        </Typography>
                                    </IconLink>
                                </Box>
                            ))}
                        </SwipeableViews>
                    </Section>
                </Box>
            ) : (
                <Section maxWidth="xl" id={sectionId}>
                    <Typography mb={2} variant="h2">
                        {title}
                    </Typography>
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
                                <motion.div
                                    variants={cardVariants}
                                    style={{
                                        backgroundColor: '#fff',
                                    }}
                                >
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
                </Section>
            )}
        </div>
    )
}

export default ProjectDisplay
