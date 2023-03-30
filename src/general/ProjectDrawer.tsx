import { Box, Link, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

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
            <Link href={`/project/${page}`} sx={{ marginBottom: '20px' }}>
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
                        width={width}
                        height={height}
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
            {title && (
                <Typography variant="h5" mt={2}>
                    {title}
                </Typography>
            )}
        </>
    )
}

export default ProjectDrawer
