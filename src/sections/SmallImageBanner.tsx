import { FunctionComponent } from 'react'

import { Box } from '@mui/material'
import Image from 'next/image'

import { ISmallImageBannerFields } from 'src/@types/contentful'
import Section from 'src/general/Section'

/**
 * Small image banner.
 */
const SmallImageBanner: FunctionComponent<ISmallImageBannerFields> = ({ images }) => {
    return (
        <Section maxWidth="xl">
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {images?.map((image) => (
                    <Image
                        key={image.fields.title}
                        alt={image.fields.title}
                        src={`https:${image.fields.file.url}`}
                        width={image.fields.file.details.image?.width}
                        height={image.fields.file.details.image?.height}
                        style={{
                            maxWidth: '15%',
                            height: 'fit-content',
                            mixBlendMode: 'normal',
                        }}
                    />
                ))}
            </Box>
        </Section>
    )
}

export default SmallImageBanner
