import type { NextPage } from 'next'
import Head from 'next/head'

//components
import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
import HomeGallery from '../components/HomeGallery'
//stylesheets
import styles from '../styles/pages/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia | Home</title>
      </Head>

      <Layout skipTo="#content" overrideClasses={styles.main}>
        <HomeBanner/>
        <HomeGallery/>
      </Layout>
    </>
  )
}

export default Home
