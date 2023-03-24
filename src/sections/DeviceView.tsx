import { FunctionComponent, PropsWithChildren, useState } from 'react'
import Image from 'next/future/image'
import Section from 'src/general/Section'
import { Box, Button, Typography } from '@mui/material'
import Icon from 'src/general/Icon'
import { StaticImageData } from 'next/dist/client/image'
import { theme } from 'src/theme/theme.default'
import { useTranslation } from 'react-i18next'

interface DeviceViewProps {
    desktopImage?: StaticImageData
    desktopAlt?: string
    mobileImage?: StaticImageData
    mobileAlt?: string
    isMobile: boolean
    sectionId?: string
    backgroundColor?: string
}

/**
 * Section to display device frame options for images. Toggle between tablet and mobile.
 */
const DeviceView: FunctionComponent<PropsWithChildren<DeviceViewProps>> = ({
    desktopImage,
    desktopAlt,
    mobileImage,
    mobileAlt,
    isMobile = false,
    sectionId,
    backgroundColor = theme.palette.text.primary,
}) => {
    const { t } = useTranslation()

    const [deviceType, setDeviceType] = useState(desktopImage ? 'tablet' : 'mobile')

    return (
        <Section maxWidth="xl" backgroundColor={backgroundColor} id={sectionId}>
            <Box
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
                <Box sx={{ [theme.breakpoints.up('md')]: { width: '10%' } }}>
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
                        {deviceType === 'mobile' ? t('project:device_view.mobile') : t('project:device_view.tablet')}
                    </Typography>
                </Box>
                <Image
                    alt={deviceType === 'mobile' ? mobileAlt || '' : desktopAlt || ''}
                    src={deviceType === 'mobile' ? mobileImage || '' : desktopImage || ''}
                    style={{
                        maxWidth: isMobile ? '100%' : '90%',
                        maxHeight: '680px',
                        width: 'auto',
                        height: 'auto',
                        zIndex: 'modal',
                        border: deviceType === 'mobile' ? '15px solid gray' : '20px solid gray',
                        borderRadius: '10px',
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {desktopImage && (
                    <Button onClick={() => setDeviceType('tablet')}>
                        <Icon name="tablet" color={deviceType === 'mobile' ? '#595959' : '#fff'} size="medium" />
                    </Button>
                )}
                {mobileImage && (
                    <Button onClick={() => setDeviceType('mobile')}>
                        <Icon name="smartphone" color={deviceType === 'mobile' ? '#fff' : '#595959'} size="medium" />
                    </Button>
                )}
            </Box>
        </Section>
    )
}

export default DeviceView
