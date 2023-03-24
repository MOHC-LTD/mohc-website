import { Box, Link, Typography } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'src/theme/theme.default'
import Section from '../general/Section'

/**
 * Section to display a component to link to the next and previous project.
 */
const ProjectNavigation: FunctionComponent = () => {
    const { t } = useTranslation()

    const projectPages = [
        {
            name: 'Online Doctor',
            link: '/project/online-doctor',
        },
        {
            name: 'Appointment booking',
            link: '/project/appointment-booking',
        },
        {
            name: 'VideoGP',
            link: '/project/video-gp',
        },
    ]

    const [currentProject, setCurrentProject] = useState(0)

    useEffect(() => {
        setCurrentProject(() => {
            const index = projectPages.indexOf(
                projectPages.find((page) => page.link === window.location.pathname) || projectPages[0]
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
                    [theme.breakpoints.up('md')]: { flexDirection: 'row', justifyContent: 'center' },
                }}
            >
                {currentProject !== 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '20px 0',
                            order: 2,
                            [theme.breakpoints.up('md')]: { order: 1, margin: '20px 80px' },
                        }}
                    >
                        <Link href={projectPages[currentProject - 1].link}>
                            <Typography variant="h5">{t('project:previous_project')}</Typography>
                        </Link>
                        <Typography variant="body1">{projectPages[currentProject - 1].name}</Typography>
                    </Box>
                )}
                {currentProject !== projectPages.length - 1 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '20px 0',
                            order: 1,
                            [theme.breakpoints.up('md')]: { order: 2, margin: '20px 80px' },
                        }}
                    >
                        <Link href={projectPages[currentProject + 1].link}>
                            <Typography variant="h5">{t('project:next_project')}</Typography>
                        </Link>
                        <Typography variant="body1">{projectPages[currentProject + 1].name}</Typography>
                    </Box>
                )}
            </Box>
        </Section>
    )
}

export default ProjectNavigation
