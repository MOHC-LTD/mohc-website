import { FunctionComponent, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useResizeDetector } from 'react-resize-detector'

import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

interface tabItem {
    title: string
    description: string
}

interface TabDetailsProps {
    title: string
    subtitle?: string
    tabItems: tabItem[]
    sectionId?: string
}

/**
 * Section to display a tabbed view of options that render a description when clicked.
 */
const TabDetails: FunctionComponent<TabDetailsProps> = ({ title, subtitle, tabItems, sectionId }) => {
    const [activeListItem, setActiveListItem] = useState(tabItems[0])

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section
                maxWidth="xl"
                isFullScreen
                hasEllipse
                backgroundColor={theme.palette.background.paper}
                id={sectionId}
            >
                <Typography variant="h3" marginBottom="20px">
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    }}
                >
                    <Box
                        sx={{
                            overflow: 'auto',
                            whiteSpace: 'nowrap',
                            [theme.breakpoints.up('md')]: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            },
                        }}
                    >
                        {tabItems.map((item) => (
                            <Button
                                onClick={(): void => setActiveListItem(item)}
                                variant="contained"
                                sx={{
                                    marginBottom: '20px',
                                    padding: 0,
                                    [theme.breakpoints.only('sm')]: {
                                        backgroundColor:
                                            item.title === activeListItem.title
                                                ? `${theme.palette.text.primary} !important`
                                                : `${theme.palette.primary} !important`,
                                        color:
                                            item.title === activeListItem.title
                                                ? theme.palette.text.secondary
                                                : theme.palette.text.primary,
                                        width: '85%',
                                        height: '80px',
                                        whiteSpace: 'wrap',
                                        margin: '10px 10px 30px',
                                        border: '1px solid black',
                                        padding: '10px',
                                    },
                                }}
                                key={item.title}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        whiteSpace: 'normal',
                                        [theme.breakpoints.up('md')]: {
                                            opacity: item.title === activeListItem.title ? '100%' : '30%',
                                            textAlign: 'left',
                                        },
                                    }}
                                >
                                    {item.title === activeListItem.title && !sm ? `${item.title} →` : item.title}
                                </Typography>
                                {item.title === activeListItem.title && sm ? (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: -15,
                                            width: 0,
                                            height: 0,
                                            borderLeft: '20px solid transparent',
                                            borderRight: '20px solid transparent',
                                            borderTop: '20px solid #101010',
                                        }}
                                    />
                                ) : null}
                            </Button>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            marginBottom: '20px',
                            [theme.breakpoints.up('md')]: {
                                maxWidth: '40%',
                            },
                        }}
                    >
                        <Typography variant="body1">{activeListItem.description}</Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {subtitle}
                </Typography>
            </Section>
        </div>
    )
}

export default TabDetails
