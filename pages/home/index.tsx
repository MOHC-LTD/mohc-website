import { Box, Typography, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import Section from 'src/general/Section'
import { theme } from 'src/theme/theme.default'
import MOHCHeader from 'assets/mohc-home.png'
import VideoGP from 'assets/video-gp.png'
import AppointmentBooking from 'assets/appointment-booking.png'
import OnlineDoctor from 'assets/online-doctor.png'
import { useTranslation } from 'react-i18next'

import { NextPageWithLayout } from 'src/types'
import ProjectDrawer from 'src/general/ProjectDrawer'
import { getTranslations } from 'src/translations/getTranslations'
import { useResizeDetector } from 'react-resize-detector'
import ContactUs from 'src/sections/ContactUs'
import PageLayout from 'src/general/PageLayout'
import AnimatedHeader from 'src/sections/AnimatedHeading'
import AccordionItem from 'src/general/AccordionItem'

const Accordion = styled('div', {
    name: 'Accordion',
})({
    '& > :not(:last-child)': {
        borderBottom: 'none',
    },

    position: 'relative',
})

const Page: NextPageWithLayout = () => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const lg = width && width < theme.breakpoints.values.xl

    const menuOptions = ['About', 'Services', 'Our work', 'Contact us']

    const accordionItems = [
        {
            header: t('home:accordion.software_engineering_header'),
            content: t('home:accordion.software_engineering_content'),
        },
        {
            header: t('home:accordion.system_design_header'),
            content: t('home:accordion.system_design_content'),
        },
        {
            header: t('home:accordion.web_development_header'),
            content: t('home:accordion.web_development_content'),
        },
        {
            header: t('home:accordion.software_maintenance_header'),
            content: t('home:accordion.software_maintenance_content'),
        },
        {
            header: t('home:accordion.user_interface_design_header'),
            content: t('home:accordion.user_interface_design_content'),
        },
        {
            header: t('home:accordion.business_intelligence_header'),
            content: t('home:accordion.business_intelligence_content'),
        },
        {
            header: t('home:accordion.consultancy_header'),
            content: t('home:accordion.consultancy_content'),
        },
    ]

    return (
        <div ref={ref}>
            <PageLayout title="Home" menuOptions={menuOptions}>
                <AnimatedHeader title={t('home:hero_banner.title')} image={MOHCHeader} />
                <Section maxWidth="xl" id="What we do">
                    <Typography variant="h3">{t('home:accordion.title')}</Typography>
                    <Accordion>
                        {accordionItems.map((item) => (
                            <AccordionItem key={item.header} heading={item.header}>
                                <Typography>{item.content}</Typography>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Section>
                <Section maxWidth="xl" id="Our work">
                    <Typography variant="h3" marginBottom="20px">
                        {t('home:our_work.title')}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: { flexDirection: 'row' },
                        }}
                    >
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { marginRight: '30px' } }}>
                            <ProjectDrawer
                                image={VideoGP}
                                width={486}
                                height={591}
                                page="video-gp"
                                title={t('home:our_work.video_gp_title') || undefined}
                                detailsList={['App development']}
                                isMobile={lg ? lg : false}
                            />
                        </Box>
                        <Box sx={{ marginBottom: '20px' }}>
                            <ProjectDrawer
                                image={AppointmentBooking}
                                width={688}
                                height={584}
                                page="appointment-booking"
                                title={t('home:our_work.appointment_booking_title') || undefined}
                                isMobile={lg ? lg : false}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            [theme.breakpoints.up('md')]: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            },
                        }}
                    >
                        <ProjectDrawer
                            image={OnlineDoctor}
                            width={791}
                            height={584}
                            page="online-doctor"
                            title={t('home:our_work.online_doctor_title') || undefined}
                            isMobile={lg ? lg : false}
                        />
                    </Box>
                </Section>
                <ContactUs sectionId="Contact us" />
            </PageLayout>
        </div>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const { getStaticProps } = getTranslations(['home'])

export { getStaticProps }

export default Page
