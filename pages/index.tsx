import type { NextPage } from 'next'
import Head from 'next/head'

//components
import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
//stylesheets
import styles from '../styles/pages/Home.module.scss'
//data
import { AboutData } from '../data/pages'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NuTopia | Home</title>
      </Head>

      <Layout skipTo="#content" overrideClasses={styles.main}>
        <HomeBanner/>
        {/* <HomeGallery/> */}
        <div className={styles.content_container}>
          <iframe className={styles.video_embed} src="https://www.youtube-nocookie.com/embed/cvLqHBbXSKE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          <hr />
          <h1>Welcome to NuTopia</h1>
          {/* content */}
          {/* event updates */}
        </div>
      </Layout>
    </>
  )
}

export default Home
