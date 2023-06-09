import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Divider, Typography } from '@mui/material'
import { useResizeDetector } from 'react-resize-detector'

import { IProjectNavigationFields } from 'src/@types/contentful'
import ProjectDrawer from 'src/general/ProjectDrawer'
import Section from 'src/general/Section'

/**
 * Small image banner.
 */
const ProjectDisplay: FunctionComponent<PropsWithChildren<IProjectNavigationFields>> = ({
    project,
    title,
    footer,
    sectionId,
}) => {
    const { height, ref } = useResizeDetector()

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
                    const navigationImage: any = page.fields.navigationImage

                    return (
                        <Box component="div" key={navigationImage?.fields.title}>
                            <ProjectDrawer
                                image={navigationImage?.fields.file.url}
                                width={navigationImage?.fields.file.details.image?.width}
                                height={navigationImage?.fields.file.details.image?.height}
                                title={page.fields.navigationTitle as string}
                                description={page.fields.navigationDescription as string}
                                page={page.fields.slug as string}
                                isInverted={index % 2 == 0 ? true : false}
                            />
                        </Box>
                    )
                })}
            </div>
            <Typography marginTop="40px" align="center">
                {footer}
            </Typography>
        </Section>
    )
}

export default ProjectDisplay
