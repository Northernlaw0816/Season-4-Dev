import type { NextPage } from 'next'
import Head from 'next/head'
import HomeGallery from '../components/HomeGallery'
import Layout from '../components/Layout'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia | Home</title>
        <meta name="description" content="Offical Yuvabharathi NuTopia Website" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Layout skipTo="#content">
        <HomeGallery/>
      </Layout>
    </>
  )
}

export default Home
