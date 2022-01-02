import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../public/componets/Footer'
import HomeGallery from '../public/componets/HomeGallery'
import NavBar from '../public/componets/NavBar'
import styles from '../styles/Home.module.scss'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia | Home</title>
        <meta name="description" content="Offical Yuvabharathi NuTopia Website" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <NavBar skipTo="#content"/>

      <main className={styles.main}>
        <HomeGallery/>
      </main>

      <Footer />
    </>
  )
}

export default Home
