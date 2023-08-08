import { FunctionComponent } from 'react'

import { Box } from '@mui/material'
import Image from 'next/image'
import { useResizeDetector } from 'react-resize-detector'
import SwipeableViews from 'react-swipeable-views'

import { ISmallImageBannerFields } from 'src/@types/contentful'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Small image banner.
 */
const SmallImageBanner: FunctionComponent<ISmallImageBannerFields> = ({ images }) => {
    const { width, ref } = useResizeDetector()

    const md = width && width < theme.breakpoints.values.lg

    const imageList = images?.map((image) => (
        <Image
            key={image.fields.title}
            alt={image.fields.title}
            src={`https:${image.fields.file.url}`}
            width={image.fields.file.details.image?.width}
            height={image.fields.file.details.image?.height}
            style={{
                maxWidth: '200px',
                height: 'fit-content',
                mixBlendMode: 'normal',
            }}
        />
    ))

    return (
        <div ref={ref}>
            {md ? (
                <Box
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                        '&:hover': {
                            cursor: 'grab',
                        },
                        '&:active': {
                            cursor: 'grabbing',
                        },
                    }}
                >
                    <Section maxWidth="xl">
                        <SwipeableViews
                            enableMouseEvents
                            resistance
                            style={{
                                overflow: 'visible',
                                width: '200px',
                            }}
                            slideStyle={{
                                width: '100%',
                            }}
                        >
                            {imageList}
                        </SwipeableViews>
                    </Section>
                </Box>
            ) : (
                <Section maxWidth="xl">
                    <Box
                        component="div"
                        sx={{
                            maxWidth: '100%',
                            overflowX: 'hidden',
                        }}
                    >
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {imageList}
                        </Box>
                    </Box>
                </Section>
            )}
        </div>
    )
}

export default SmallImageBanner
