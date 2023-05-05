import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'

interface ProjectDrawerProps {
    image: string
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
}) => {
    return (
        <>
            <Link
                href={`/project/${page}`}
                style={{
                    marginBottom: '20px',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '100%',
                        margin: 'auto',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <img
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
                    </Box>
                </Box>
            </Link>
            {title ? (
                <Typography variant="h5" mt={2}>
                    {title}
                </Typography>
            ) : null}
        </>
    )
}

export default ProjectDrawer
