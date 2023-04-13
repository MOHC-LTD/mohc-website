import { FunctionComponent, PropsWithChildren } from 'react'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'

interface ProjectDrawerProps {
    image: string
    page: string
    title?: string
    detailsList?: string[]
    isMobile?: boolean
}

/**
 * Component to display a project image with a title and description that links to a project page.
 * A drawer animation effect is shown on hover for desktop.
 */
const ProjectDrawer: FunctionComponent<PropsWithChildren<ProjectDrawerProps>> = ({ image, page, title }) => {
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
                        maxHeight: '390px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '14px',
                    }}
                >
                    <img
                        src={image}
                        alt={title || ''}
                        style={{
                            display: 'inline-block',
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                            minWidth: 0,
                            objectFit: 'contain',
                        }}
                        loading="lazy"
                    />
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
