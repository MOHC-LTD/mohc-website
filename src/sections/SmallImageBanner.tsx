import { FunctionComponent, PropsWithChildren } from 'react'

import { Box } from '@mui/material'
import { Asset } from 'contentful'

import Section from 'src/general/Section'

interface SmallImageBannerProps {
    images: Asset[]
}

/**
 * Small image banner.
 */
const SmallImageBanner: FunctionComponent<PropsWithChildren<SmallImageBannerProps>> = ({ images }) => {
    return (
        <Section maxWidth="xl">
            <Box
                componenet="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {images.map((image) => (
                    <img
                        key={image.fields.title}
                        alt={image.fields.title}
                        src={`https:${image.fields.file.url}`}
                        width={image.fields.file.details.image?.width}
                        height={image.fields.file.details.image?.height}
                        style={{
                            maxWidth: '15%',
                            height: 'fit-content',
                        }}
                    />
                ))}
            </Box>
        </Section>
    )
}

export default SmallImageBanner
