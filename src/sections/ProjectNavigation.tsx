import { FunctionComponent, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { IProjectNavigationFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface Props {
    pages: IProjectNavigationFields
}

/**
 * Section to display a component to link to the next and previous project.
 */
const ProjectNavigation: FunctionComponent<Props> = ({ pages }) => {
    const { t } = useTranslation()

    const [currentProject, setCurrentProject] = useState(0)

    const projects = pages.project || []

    useEffect(() => {
        setCurrentProject(() => {
            const index = projects?.indexOf(
                projects.find((page) => `/project/${page.fields.slug}` === window.location.pathname) || projects[0]
            )

            return index
        })
    })

    return (
        <Section maxWidth="xl">
            <Box
                componenet="div"
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
                        componenet="div"
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
                        <Link href={`/project/${projects[currentProject - 1].fields.slug}`}>
                            <Typography variant="h5">{t('project:previous_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {projects[currentProject - 1].fields.navigationTitle as string}
                        </Typography>
                    </Box>
                ) : null}
                {currentProject !== projects.length - 1 ? (
                    <Box
                        componenet="div"
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
                        <Link href={`/project/${projects[currentProject + 1].fields.slug}`}>
                            <Typography variant="h5">{t('project:next_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {projects[currentProject + 1].fields.navigationTitle as string}
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </Section>
    )
}

export default ProjectNavigation
