import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../public/componets/Footer'
import NavBar from '../public/componets/NavBar'
import styles from '../styles/Home.module.scss'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia</title>
        <meta name="description" content="Offical Yuvabharathi Nutopia Website" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <NavBar/>

      <main className={styles.main}>
        {/* <div className={styles.mini_gallery}>
          <img src="https://singlecolorimage.com/get/33fd8f/400x100.png" alt="" />
          <img src="https://singlecolorimage.com/get/eeeeee/400x100.png" alt="" />
        </div> */}
      </main>

      <Footer />
    </>
  )
}

export default Home
