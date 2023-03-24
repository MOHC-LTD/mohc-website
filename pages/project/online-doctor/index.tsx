import { ReactNode } from 'react'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import HeadingWithImage from 'src/sections/HeadingWithImage'
import appointmentBooking from 'assets/appointment-booking/appointment-management-hero-image.jpg'

import { NextPageWithLayout } from 'src/types'
import { getTranslations } from 'src/translations/getTranslations'
import { useTranslation } from 'react-i18next'
import ContactUs from 'src/sections/ContactUs'
import PageLayout from 'src/general/PageLayout'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import Section from 'src/general/Section'
import { Box, Typography } from '@mui/material'
import { theme } from 'src/theme/theme.default'
import manOnLaptop from 'assets/online-doctor/man-on-laptop.png'
import Image from 'next/future/image'
import DeviceView from 'src/sections/DeviceView'
import { useResizeDetector } from 'react-resize-detector'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import ImageAndText from 'src/sections/ImageAndText'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import PatientRecord from 'assets/online-doctor/patient-record.png'
import AsthmaTreatments from 'assets/online-doctor/asthma-treatments.png'
import OnlineConsultations from 'assets/online-doctor/online-consultations.png'
import GeneralHealth from 'assets/online-doctor/general-health.png'
import Treatment from 'assets/online-doctor/treatment.png'
import Consultation from 'assets/online-doctor/consultation.png'

const Page: NextPageWithLayout = () => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const menuOptions = ['placeholder']

    const sectorList = ['Platform']

    return (
        <div ref={ref}>
            <PageLayout title="LloydsPharmacy OnlineDoctor" menuOptions={menuOptions}>
                <HeadingWithImage
                    title={t('home:our_work.online_doctor_title')}
                    subtitle={t('project:online_doctor.subtitle')}
                    image={appointmentBooking}
                />
                <Section maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            [theme.breakpoints.up('md')]: { flexDirection: 'row', justifyContent: 'space-between' },
                        }}
                    >
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            <Typography variant="h3">{t('project:online_doctor.overview_title')}</Typography>
                            <Typography variant="body1">{t('project:online_doctor.overview_description')}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            <Typography variant="h3">{t('project:online_doctor.sector_title')}</Typography>
                            {sectorList.map((item) => (
                                <Typography key={item} variant="body1">
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Section>
                <Section maxWidth="xl">
                    <Image alt="Online doctor" src={manOnLaptop} style={{ maxWidth: '100%', height: 'auto' }} />
                </Section>
                <MobileImagesAndText
                    title={t('project:online_doctor.bespoke_system_title')}
                    description={t('project:online_doctor.bespoke_system_subtitle')}
                    images={[OnlineConsultations, GeneralHealth, Treatment, Consultation]}
                />
                <CenteredTitleAndText
                    title={t('project:online_doctor.online_doctor_team')}
                    titleVariant="h4"
                    backgroundColor="#AFD991"
                />
                <ImageAndText
                    image={PatientRecord}
                    title={t('project:online_doctor.patient_record_title')}
                    description={t('project:online_doctor.patient_record_subtitle')}
                />
                <DeviceView
                    desktopImage={AsthmaTreatments}
                    desktopAlt="Asthma treatments"
                    isMobile={sm ? sm : false}
                    backgroundColor="#AFD991"
                />
                <CenteredTitleAndText
                    title={t('project:section_title_placeholder')}
                    text={t('project:section_subtitle_placeholder') || undefined}
                />
                <ProjectNavigation />
                <ContactUs sectionId="Contact us" />
            </PageLayout>
        </div>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const { getStaticProps } = getTranslations(['home', 'project'])

export { getStaticProps }

export default Page
