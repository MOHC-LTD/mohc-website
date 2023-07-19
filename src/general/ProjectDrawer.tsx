import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { theme } from 'src/theme/theme.default'

interface ProjectDrawerProps {
    image: string
    width: number
    height: number
    page: string
    title?: string
    description?: string
    keywords?: string[]
    isMobile?: boolean
    isInverted?: boolean
}

/**
 * Component to display a project image with a title and description that links to a project page.
 * A drawer animation effect is shown on hover for desktop.
 */
const ProjectDrawer: FunctionComponent<PropsWithChildren<ProjectDrawerProps>> = ({
    image,
    width,
    height,
    isInverted,
    page,
    title,
    description,
    keywords,
}) => {
    return (
        <Box
            component="div"
            my={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up('md')]: {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
            }}
        >
            <Box
                component="div"
                sx={{
                    maxWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.background.default,
                    zIndex: 1,
                    order: 2,
                    [theme.breakpoints.up('md')]: {
                        order: isInverted ? 2 : 1,
                        maxWidth: '45%',
                        padding: '40px',
                    },
                }}
            >
                <Typography mb={2} variant="h3" color={theme.palette.text.primary}>
                    {title}
                </Typography>
                <Typography mb={2} variant="body2" color={theme.palette.text.primary}>
                    {description}
                </Typography>
                <Box
                    component="div"
                    mb={2}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {keywords?.map((word) => (
                        <Chip
                            variant="outlined"
                            key={word}
                            label={word}
                            sx={{
                                marginRight: '10px',
                                marginBottom: '10px',
                            }}
                        />
                    ))}
                </Box>
            </Box>
            <Box
                component="div"
                sx={{
                    position: 'relative',
                    maxWidth: '100%',
                    order: 1,
                    [theme.breakpoints.up('md')]: {
                        order: isInverted ? 1 : 2,
                        display: 'flex',
                        height: 'fit-content',
                        maxWidth: '55%',
                    },
                }}
            >
                <Link href={`/project/${page}`}>
                    <Image
                        src={`https:${image}`}
                        width={width}
                        height={height}
                        alt={title || ''}
                        style={{
                            display: 'block',
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                            minWidth: 0,
                            objectFit: 'contain',
                        }}
                        loading="lazy"
                    />
                </Link>
            </Box>
        </Box>
    )
}

export default ProjectDrawer
