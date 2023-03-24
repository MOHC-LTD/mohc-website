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
import ImageAndText from 'src/sections/ImageAndText'
import VideoGP from 'assets/video-gp.png'
import VideoGPSection from 'assets/video-gp/video-gp-section.png'

const Page: NextPageWithLayout = () => {
    const { t } = useTranslation()

    const menuOptions = ['placeholder']

    const sectorList = ['Platform']

    return (
        <PageLayout title="VideoGP" menuOptions={menuOptions}>
            <HeadingWithImage
                title={t('home:our_work.video_gp_title')}
                subtitle={t('project:online_doctor.subtitle')}
                image={VideoGP}
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
            <ImageAndText
                image={VideoGPSection}
                title={t('project:section_title_placeholder')}
                description={t('project:section_subtitle_placeholder')}
            />
            <ProjectNavigation />
            <ContactUs sectionId="Contact us" />
        </PageLayout>
    )
}

Page.getLayout = (page): ReactNode => <DefaultThemeProvider>{page}</DefaultThemeProvider>

const { getStaticProps } = getTranslations(['home', 'project'])

export { getStaticProps }

export default Page
