import { ReactNode } from 'react'
import DefaultThemeProvider from 'src/general/DefaultThemeProvider'
import HeadingWithImage from 'src/sections/HeadingWithImage'

import { NextPageWithLayout } from 'src/types'
import { getTranslations } from 'src/translations/getTranslations'
import { useTranslation } from 'react-i18next'
import ContactUs from 'src/sections/ContactUs'
import PageLayout from 'src/general/PageLayout'
import ProjectNavigation from 'src/sections/ProjectNavigation'
import Section from 'src/general/Section'
import { Box, Typography } from '@mui/material'
import { theme } from 'src/theme/theme.default'
import realTimeScheduling from 'assets/appointment-booking/real-time-schedual-view.png'
import realTimeSchedulingMobile from 'assets/appointment-booking/schedule-view-mobile.png'
import questionnaireBuilder from 'assets/appointment-booking/questionnaire-builder.png'
import Image from 'next/future/image'
import { useResizeDetector } from 'react-resize-detector'
import CenteredTitleAndText from 'src/sections/CenteredTitleAndText'
import ImageAndText from 'src/sections/ImageAndText'
import ImageSlider from 'src/sections/ImageSlider'
import MobileImagesAndText from 'src/sections/MobileImagesAndText'
import AppointmentBooking from 'assets/appointment-booking.png'
import SelectAService from 'assets/appointment-booking/select-a-service.png'
import FindYourLocation from 'assets/appointment-booking/find-your-location.png'
import Questionnaire from 'assets/appointment-booking/questionnaire.png'
import AppointmentConfirmation from 'assets/appointment-booking/appointment-confirmation.png'
import SlideshowImage from 'assets/online-doctor/slideshow-2.png'

const Page: NextPageWithLayout = () => {
    const { t } = useTranslation()

    const { width, ref } = useResizeDetector()

    const sm = width && width < theme.breakpoints.values.md

    const menuOptions = ['placeholder']

    const doubleList = [
        {
            title: 'Platform',
            type: 'Shopify',
        },
        {
            title: 'Search',
            type: 'Algolia',
        },
        {
            title: 'Reviews',
            type: 'Trustpilot',
        },
        {
            title: 'Marketing',
            type: 'Mapp',
        },
        {
            title: 'Analytics',
            type: 'Google',
        },
        {
            title: 'Fulfillment',
            type: 'Custom',
        },
    ]

    const IMAGES = [
        {
            id: 0,
            imageSrc: SlideshowImage,
        },
        {
            id: 1,
            imageSrc: SlideshowImage,
        },
        {
            id: 2,
            imageSrc: SlideshowImage,
        },
        {
            id: 3,
            imageSrc: SlideshowImage,
        },
    ]

    return (
        <div ref={ref}>
            <PageLayout title="Appointment booking" menuOptions={menuOptions}>
                <HeadingWithImage
                    title={t('home:our_work.appointment_booking_title')}
                    subtitle={t('project:appointment_booking.subtitle')}
                    image={AppointmentBooking}
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
                            <Typography variant="h3">
                                {t('project:lloydspharmacy_replatform.overview_title')}
                            </Typography>
                            <Typography variant="body1">
                                {t('project:lloydspharmacy_replatform.overview_description')}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '20px', [theme.breakpoints.up('md')]: { width: '40%' } }}>
                            <Typography variant="h3">
                                {t('project:lloydspharmacy_replatform.technology_title')}
                            </Typography>
                            {doubleList.map((line) => (
                                <Box
                                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                                    key={line.title}
                                >
                                    <Typography variant="body1">{line.title}</Typography>
                                    <Typography variant="body1">{line.type}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Section>
                <Section maxWidth="xl">
                    <Image
                        alt="Real time scheduling"
                        src={sm ? realTimeSchedulingMobile : realTimeScheduling}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </Section>
                <CenteredTitleAndText
                    title={t('project:appointment_booking.tools_title')}
                    text={t('project:appointment_booking.tools_description') || undefined}
                />
                <ImageSlider images={IMAGES} />
                <ImageAndText
                    image={questionnaireBuilder}
                    title={t('project:appointment_booking.questionnaire_builder_title')}
                    description={t('project:appointment_booking.questionnaire_builder_subtitle')}
                />
                <CenteredTitleAndText
                    title={t('project:section_subtitle_placeholder')}
                    titleVariant="h4"
                    backgroundColor="#7443FF"
                />
                <MobileImagesAndText
                    title={t('project:online_doctor.bespoke_system_title')}
                    description={t('project:online_doctor.bespoke_system_subtitle')}
                    images={[SelectAService, FindYourLocation, Questionnaire, AppointmentConfirmation]}
                />
                <ImageSlider images={IMAGES} />
                <CenteredTitleAndText
                    title={t('project:appointment_booking.continually_updated_title')}
                    text={t('project:appointment_booking.continually_updated_description') || undefined}
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
