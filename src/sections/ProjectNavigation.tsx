import { FunctionComponent, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface ProjectProps {
    slug: string
    navigationTitle: string
}

interface Props {
    projects: ProjectProps[]
}

/**
 * Section to display a component to link to the next and previous project.
 */
const ProjectNavigation: FunctionComponent<Props> = ({ projects }) => {
    const { t } = useTranslation()

    const [currentProject, setCurrentProject] = useState(0)

    useEffect(() => {
        setCurrentProject(() => {
            const index = projects?.indexOf(
                projects.find((page) => `/project/${page.slug}` === window.location.pathname) || projects[0]
            )

            return index
        })
    })

    return (
        <Section maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                    },
                }}
            >
                {currentProject !== 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '20px 0',
                            order: 2,
                            [theme.breakpoints.up('md')]: {
                                order: 1,
                                margin: '20px 80px',
                            },
                        }}
                    >
                        <Link href={`/project/${projects[currentProject - 1].slug}`}>
                            <Typography variant="h5">{t('project:previous_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {projects[currentProject - 1].navigationTitle as string}
                        </Typography>
                    </Box>
                ) : null}
                {currentProject !== projects.length - 1 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '20px 0',
                            order: 1,
                            [theme.breakpoints.up('md')]: {
                                order: 2,
                                margin: '20px 80px',
                            },
                        }}
                    >
                        <Link href={`/project/${projects[currentProject + 1].slug}`}>
                            <Typography variant="h5">{t('project:next_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {projects[currentProject + 1].navigationTitle as string}
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </Section>
    )
}

export default ProjectNavigation
