import { Box, Collapse, Link, List, ListItem, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren, useState } from 'react'
import { theme } from 'src/theme/theme.default'
import { Spacing } from 'src/general/utils/config'
import Image from 'next/future/image'
import { StaticImageData } from 'next/dist/client/image'
import { Stack } from '@mui/system'
import { useTranslation } from 'react-i18next'

interface ProjectDrawerProps {
    image: StaticImageData
    width: number
    height: number
    page: string
    title?: string
    detailsList?: string[]
    isMobile?: boolean
}

/**
 * Component to display a project image with a title and description that links to a project page.
 * A drawer animation effect is shown on hover for desktop.
 */
const ProjectDrawer: FunctionComponent<PropsWithChildren<ProjectDrawerProps>> = ({
    image,
    width,
    height,
    page,
    title,
    detailsList,
    isMobile = false,
}) => {
    const { t } = useTranslation()

    const [collapsed, setCollapsed] = useState(false)

    const projectImage = (
        <Box
            sx={{
                position: 'relative',
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                visibility: 'visible',

                [theme.breakpoints.up('xl')]: { width: width, height: height },
            }}
        >
            <Image
                src={image}
                alt={title || ''}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: 'auto',
                }}
                loading="lazy"
            />
        </Box>
    )

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {isMobile ? (
                    <Link href={`/project/${page}`} sx={{ marginBottom: '20px' }}>
                        {projectImage}
                    </Link>
                ) : (
                    <Box
                        sx={{
                            background: theme.palette.text.primary,
                            position: 'relative',
                            marginBottom: '20px',
                            width: width,
                            height: height,
                        }}
                        onMouseOver={() => setCollapsed(true)}
                        onMouseOut={() => setCollapsed(false)}
                    >
                        <Link href={`/project/${page}`}>
                            <Typography
                                color={theme.palette.text.secondary}
                                sx={{
                                    transform: 'rotate(-90deg)',
                                    position: 'absolute',
                                    right: -35,
                                    top: '50%',
                                    marginBottom: 0,
                                }}
                            >
                                {t('home:our_work.view_project')}
                            </Typography>
                        </Link>
                        <Collapse orientation="horizontal" in={!collapsed} collapsedSize={width - 50}>
                            {projectImage}
                        </Collapse>
                    </Box>
                )}
                {title && (
                    <Typography variant="h5" marginBottom={0}>
                        {title}
                    </Typography>
                )}
                {detailsList && (
                    <List sx={{ listStyleType: 'none' }}>
                        {detailsList.map((detail) => (
                            <ListItem
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '&::before': { content: '"-"', margin: '5px' },
                                }}
                                key={detail}
                            >
                                <Stack spacing={Spacing.List} direction="row" alignItems="center" width={1}>
                                    <Typography variant="body1" marginBottom={0}>
                                        {detail}
                                    </Typography>
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </>
    )
}

export default ProjectDrawer
