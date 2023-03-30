import { Box, Link, Typography } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'src/theme/theme.default'
import Section from '../general/Section'
import { IPageFields, IProjectNavigationFields } from 'src/@types/contentful'

interface Props {
    pages: IProjectNavigationFields
}

/**
 * Section to display a component to link to the next and previous project.
 */
const ProjectNavigation: FunctionComponent<Props> = ({ pages }) => {
    const { t } = useTranslation()

    const [currentProject, setCurrentProject] = useState(0)

    useEffect(() => {
        setCurrentProject(() => {
            const index = pages.project?.indexOf(
                pages.project.find((page) => `/project/${page.fields.slug}` === window.location.pathname) ||
                    pages.project[0]
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
                        <Link href={`/project/${pages.project[currentProject - 1].fields.slug}`}>
                            <Typography variant="h5">{t('project:previous_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {pages.project[currentProject - 1].fields.navigationTitle}
                        </Typography>
                    </Box>
                )}
                {currentProject !== pages.project.length - 1 && (
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
                        <Link href={`/project/${pages.project[currentProject + 1].fields.slug}`}>
                            <Typography variant="h5">{t('project:next_project')}</Typography>
                        </Link>
                        <Typography variant="body1">
                            {pages.project[currentProject + 1].fields.navigationTitle}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Section>
    )
}

export default ProjectNavigation
