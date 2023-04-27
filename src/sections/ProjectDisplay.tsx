import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import { IProjectNavigationFields } from 'src/@types/contentful'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface ProjectDisplayProps {
    project?: IProjectNavigationFields
}

/**
 * Small image banner.
 */
const ProjectDisplay: FunctionComponent<PropsWithChildren<ProjectDisplayProps>> = ({ project }) => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section maxWidth="xl" id="Our work">
                <Typography variant="h3" marginBottom="20px">
                    {t('home:our_work.title')}
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        [theme.breakpoints.up('md')]: {
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        },
                    }}
                >
                    {project?.project?.map((page, index) => {
                        const navigationImage: any = page.fields.navigationImage

                        const gridColumn = index === 0 ? 'span 2' : 'span 1'

                        return (
                            <Box gridColumn={sm ? undefined : gridColumn} key={navigationImage?.fields.title}>
                                <ProjectDrawer
                                    image={navigationImage?.fields.file.url}
                                    width={navigationImage?.fields.file.details.image?.width}
                                    height={navigationImage?.fields.file.details.image?.height}
                                    title={page.fields.navigationTitle as string}
                                    page={page.fields.slug as string}
                                />
                            </Box>
                        )
                    })}
                </Box>
            </Section>
        </div>
    )
}

export default ProjectDisplay
