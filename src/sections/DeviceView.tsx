import { FunctionComponent, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useResizeDetector } from 'react-resize-detector'

import { IDeviceViewFields } from 'src/@types/contentful'
import Icon from 'src/general/Icon'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'

/**
 * Section to display device frame options for images. Toggle between tablet and mobile.
 */
const DeviceView: FunctionComponent<IDeviceViewFields> = ({
    desktopImage,
    mobileImage,
    sectionId,
    backgroundColor = theme.palette.text.primary,
}) => {
    const { t } = useTranslation()

    const [deviceType, setDeviceType] = useState(desktopImage ? 'tablet' : 'mobile')

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    return (
        <div ref={ref}>
            <Section maxWidth="xl" backgroundColor={backgroundColor} id={sectionId}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        [theme.breakpoints.up('md')]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            [theme.breakpoints.up('md')]: {
                                width: '10%',
                            },
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                color: 'transparent',
                                WebkitTextStroke: '1px #595959;',
                                textStroke: '1px #595959;',
                                [theme.breakpoints.up('md')]: {
                                    transform: 'rotate(-90deg) translate(-80px)',
                                    transformOrigin: 'bottom right',
                                },
                            }}
                        >
                            {deviceType === 'mobile'
                                ? t('project:device_view.mobile')
                                : t('project:device_view.tablet')}
                        </Typography>
                    </Box>
                    <Image
                        alt={
                            deviceType === 'mobile' ? mobileImage?.fields.title || '' : desktopImage?.fields.title || ''
                        }
                        src={
                            deviceType === 'mobile'
                                ? `https:${mobileImage?.fields.file.url}` || ''
                                : `https:${desktopImage?.fields.file.url}` || ''
                        }
                        width={
                            deviceType === 'mobile'
                                ? mobileImage?.fields.file.details.image?.width || undefined
                                : desktopImage?.fields.file.details.image?.width || undefined
                        }
                        height={
                            deviceType === 'mobile'
                                ? mobileImage?.fields.file.details.image?.height || undefined
                                : desktopImage?.fields.file.details.image?.height || undefined
                        }
                        style={{
                            maxWidth: sm ? '100%' : '90%',
                            maxHeight: '680px',
                            width: 'auto',
                            height: 'auto',
                            zIndex: 'modal',
                            border: deviceType === 'mobile' ? '15px solid gray' : '20px solid gray',
                            borderRadius: '10px',
                        }}
                    />
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {desktopImage ? (
                        <Button onClick={(): void => setDeviceType('tablet')}>
                            <Icon name="tablet" color={deviceType === 'mobile' ? '#595959' : '#fff'} size="medium" />
                        </Button>
                    ) : null}
                    {mobileImage ? (
                        <Button onClick={(): void => setDeviceType('mobile')}>
                            <Icon
                                name="smartphone"
                                color={deviceType === 'mobile' ? '#fff' : '#595959'}
                                size="medium"
                            />
                        </Button>
                    ) : null}
                </Box>
            </Section>
        </div>
    )
}

export default DeviceView
