import { FunctionComponent, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface Pages {
    navigationTitle: string
    slug: string
}

interface Props {
    pages?: Pages[]
}

/**
 * Section to display a component to link to the next and previous project.
 */
const ProjectNavigation: FunctionComponent<Props> = ({ pages }) => {
    const { t } = useTranslation()

    const [currentProject, setCurrentProject] = useState(0)

    const projects = pages || []

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
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    },
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        margin: '20px 0',
                        order: 1,
                        [theme.breakpoints.up('md')]: {
                            order: 2,
                            margin: '20px 80px',
                        },
                    }}
                >
                    {currentProject !== projects?.length - 1 ? (
                        <>
                            <Link
                                href={`/project/${projects[currentProject + 1].slug}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Typography variant="h5">{t('project:next_project')}</Typography>
                            </Link>
                            <Typography variant="body1">
                                {projects[currentProject + 1].navigationTitle as string}
                            </Typography>
                        </>
                    ) : null}
                    {currentProject === projects.length - 1 ? (
                        <>
                            <Link
                                href={`/project/${projects[0].slug}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Typography variant="h5">{t('project:next_project')}</Typography>
                            </Link>
                            <Typography variant="body1">{projects[0].navigationTitle as string}</Typography>
                        </>
                    ) : null}
                </Box>
            </Box>
        </Section>
    )
}

export default ProjectNavigation
