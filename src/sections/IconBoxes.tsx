import { FunctionComponent, PropsWithChildren } from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'

import { IIconBox } from 'src/@types/contentful'
import Icon from 'src/general/Icon'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface IconBoxesProps {
    title: string
    color: string
    boxDetails: IIconBox[]
    sectionId?: string
}

/**
 * Section to display an image and text component.
 */
const IconBoxes: FunctionComponent<PropsWithChildren<IconBoxesProps>> = ({ title, color, boxDetails, sectionId }) => {
    return (
        <Section maxWidth="xl" id={sectionId}>
            <Typography variant="h3">{title}</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    [theme.breakpoints.up('md')]: {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    },
                    [theme.breakpoints.up('xl')]: {
                        gridTemplateColumns: 'repeat(4, 1fr)',
                    },
                }}
            >
                {boxDetails?.map((box) => (
                    <Box
                        key={box.fields.title}
                        sx={{
                            backgroundColor: color,
                            margin: '10px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Icon
                            name={box.fields.iconName || 'square'}
                            size="large"
                            color="white"
                            sx={{
                                margin: '40px',
                            }}
                        />
                        <Typography variant="body1" color="white" mb={2}>
                            {box.fields.title}
                        </Typography>
                        <Typography variant="body2" align="center" color="white">
                            {box.fields.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Section>
    )
}

export default IconBoxes
