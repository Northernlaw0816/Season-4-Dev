import type { NextPage } from 'next'
import Head from 'next/head'
import HomeBanner from '../components/HomeBanner'
import HomeGallery from '../components/HomeGallery'
import Layout from '../components/Layout'
import Logo from '../components/Logo'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia | Home</title>
      </Head>

      <Layout skipTo="#content">
        <HomeBanner/>
        <HomeGallery/>
      </Layout>
    </>
  )
}

export default Home
