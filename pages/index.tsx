import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nutopia</title>
        <meta name="description" content="Offical Yuvabharathi Nutopia Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navbar}>
        <Link href="/"><a className={`${styles.nav_button} ${styles.home_button_prt}`} aria-label="NuTopia Homepage">
          <svg className={styles.home_button} viewBox="0 0 113 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 1">
              <g className={styles.logo_n}>
                <mask id="path-1-inside-1_0_1" fill="#cccccc">
                  <path d="M0 57L19 0H33L14 57H0Z"/>
                </mask>
                <path d="M0 57L19 0H33L14 57H0Z" fill="#cccccc" stroke="black" strokeWidth="2" mask="url(#path-1-inside-1_0_1)"/>
              </g>
              <g className={styles.logo_v}>
                <mask id="path-2-inside-2_0_1" fill="white">
                  <path d="M53.7511 56.8453H41.6493L19 0H33L49.6987 45.7427C57.9886 34.7141 62.1336 24.1296 62.1336 13.9893C62.1336 8.58601 61.3564 3.92292 59.8021 0H73.0697C74.2169 2.96069 74.7906 6.88361 74.7906 11.7688C74.7906 25.3139 67.7774 40.3394 53.7511 56.8453Z"/>
                </mask>
                <path d="M53.7511 56.8453H41.6493L19 0H33L49.6987 45.7427C57.9886 34.7141 62.1336 24.1296 62.1336 13.9893C62.1336 8.58601 61.3564 3.92292 59.8021 0H73.0697C74.2169 2.96069 74.7906 6.88361 74.7906 11.7688C74.7906 25.3139 67.7774 40.3394 53.7511 56.8453Z" fill="#0070F3" stroke="black" strokeWidth="2" mask="url(#path-2-inside-2_0_1)"/>
              </g>
              <g className={styles.logo_u}>
                <mask id="path-3-inside-3_0_1" fill="#cccccc">
                  <path d="M88.0136 56.8295C83.1629 56.8295 79.4479 55.6582 76.8688 53.3157C74.2896 50.9731 73 47.6959 73 43.4841C73 42.5849 73.0592 41.6503 73.1775 40.6801C73.2958 39.6863 73.4023 38.9528 73.4969 38.4796C73.5916 37.9826 75.0468 31.1561 77.8626 18H88.9719L84.3223 39.8993C84.0857 40.9404 83.9674 41.9815 83.9674 43.0227C83.9674 44.7264 84.4643 45.9923 85.4581 46.8204C86.4519 47.6486 87.7652 48.0627 89.3978 48.0627C91.4801 48.0627 93.1365 47.3883 94.3669 46.0396C95.621 44.6672 96.5438 42.6204 97.1354 39.8993L101.785 18H112.788L108.351 38.8345C107.002 45.2233 104.719 49.8255 101.501 52.6413C98.283 55.4335 93.7872 56.8295 88.0136 56.8295Z"/>
                </mask>
                <path d="M88.0136 56.8295C83.1629 56.8295 79.4479 55.6582 76.8688 53.3157C74.2896 50.9731 73 47.6959 73 43.4841C73 42.5849 73.0592 41.6503 73.1775 40.6801C73.2958 39.6863 73.4023 38.9528 73.4969 38.4796C73.5916 37.9826 75.0468 31.1561 77.8626 18H88.9719L84.3223 39.8993C84.0857 40.9404 83.9674 41.9815 83.9674 43.0227C83.9674 44.7264 84.4643 45.9923 85.4581 46.8204C86.4519 47.6486 87.7652 48.0627 89.3978 48.0627C91.4801 48.0627 93.1365 47.3883 94.3669 46.0396C95.621 44.6672 96.5438 42.6204 97.1354 39.8993L101.785 18H112.788L108.351 38.8345C107.002 45.2233 104.719 49.8255 101.501 52.6413C98.283 55.4335 93.7872 56.8295 88.0136 56.8295Z" fill="#cccccc" stroke="black" strokeWidth="2" mask="url(#path-3-inside-3_0_1)"/>
              </g>
            </g>
          </svg>
          <span className={styles.logo_text}>Topia</span>
        </a></Link>
        <span className={styles.spacer}>Season 1</span>
        <a href="" className={styles.nav_button}>Gallery</a>
        <a href="" className={styles.nav_button}>Events</a>
        <a href="" className={styles.nav_button}>Details</a>
        <a href="" className={styles.nav_button}>Registration</a>
        <a href="" className={styles.nav_button}>About</a>
        <a href="" className={styles.nav_button}>Contact</a>
      </nav>

      <nav className={styles.navbar_mobile}>
        <Link href="/"><a className={`${styles.nav_button} ${styles.home_button_prt}`}>
          <svg className={styles.home_button} viewBox="0 0 113 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 1">
              <g className={styles.logo_n}>
                <mask id="path-1-inside-1_0_1" fill="#cccccc">
                  <path d="M0 57L19 0H33L14 57H0Z"/>
                </mask>
                <path d="M0 57L19 0H33L14 57H0Z" fill="#cccccc" stroke="black" strokeWidth="2" mask="url(#path-1-inside-1_0_1)"/>
              </g>
              <g className={styles.logo_v}>
                <mask id="path-2-inside-2_0_1" fill="white">
                  <path d="M53.7511 56.8453H41.6493L19 0H33L49.6987 45.7427C57.9886 34.7141 62.1336 24.1296 62.1336 13.9893C62.1336 8.58601 61.3564 3.92292 59.8021 0H73.0697C74.2169 2.96069 74.7906 6.88361 74.7906 11.7688C74.7906 25.3139 67.7774 40.3394 53.7511 56.8453Z"/>
                </mask>
                <path d="M53.7511 56.8453H41.6493L19 0H33L49.6987 45.7427C57.9886 34.7141 62.1336 24.1296 62.1336 13.9893C62.1336 8.58601 61.3564 3.92292 59.8021 0H73.0697C74.2169 2.96069 74.7906 6.88361 74.7906 11.7688C74.7906 25.3139 67.7774 40.3394 53.7511 56.8453Z" fill="#0070F3" stroke="black" strokeWidth="2" mask="url(#path-2-inside-2_0_1)"/>
              </g>
              <g className={styles.logo_u}>
                <mask id="path-3-inside-3_0_1" fill="#cccccc">
                  <path d="M88.0136 56.8295C83.1629 56.8295 79.4479 55.6582 76.8688 53.3157C74.2896 50.9731 73 47.6959 73 43.4841C73 42.5849 73.0592 41.6503 73.1775 40.6801C73.2958 39.6863 73.4023 38.9528 73.4969 38.4796C73.5916 37.9826 75.0468 31.1561 77.8626 18H88.9719L84.3223 39.8993C84.0857 40.9404 83.9674 41.9815 83.9674 43.0227C83.9674 44.7264 84.4643 45.9923 85.4581 46.8204C86.4519 47.6486 87.7652 48.0627 89.3978 48.0627C91.4801 48.0627 93.1365 47.3883 94.3669 46.0396C95.621 44.6672 96.5438 42.6204 97.1354 39.8993L101.785 18H112.788L108.351 38.8345C107.002 45.2233 104.719 49.8255 101.501 52.6413C98.283 55.4335 93.7872 56.8295 88.0136 56.8295Z"/>
                </mask>
                <path d="M88.0136 56.8295C83.1629 56.8295 79.4479 55.6582 76.8688 53.3157C74.2896 50.9731 73 47.6959 73 43.4841C73 42.5849 73.0592 41.6503 73.1775 40.6801C73.2958 39.6863 73.4023 38.9528 73.4969 38.4796C73.5916 37.9826 75.0468 31.1561 77.8626 18H88.9719L84.3223 39.8993C84.0857 40.9404 83.9674 41.9815 83.9674 43.0227C83.9674 44.7264 84.4643 45.9923 85.4581 46.8204C86.4519 47.6486 87.7652 48.0627 89.3978 48.0627C91.4801 48.0627 93.1365 47.3883 94.3669 46.0396C95.621 44.6672 96.5438 42.6204 97.1354 39.8993L101.785 18H112.788L108.351 38.8345C107.002 45.2233 104.719 49.8255 101.501 52.6413C98.283 55.4335 93.7872 56.8295 88.0136 56.8295Z" fill="#cccccc" stroke="black" strokeWidth="2" mask="url(#path-3-inside-3_0_1)"/>
              </g>
            </g>
          </svg>
          <span className={styles.logo_text}>Topia</span>
        </a></Link>
        <span className={styles.spacer}>Season 1</span>
        <a href="#" className={styles.nav_button} aria-label="Menu">
          <svg className={styles.hamburger} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={styles.line} id="1" width="32" height="8" fill="white"/>
            <rect className={styles.line} id="2" width="32" height="8" fill="white" y="12"/>
            <rect className={styles.line} id="3" width="32" height="8" fill="white" y="24"/>
          </svg>
        </a>
      </nav>

      <main className={styles.main}>
        {/* <div className={styles.mini_gallery}>
          <img src="https://singlecolorimage.com/get/33fd8f/400x100.png" alt="" />
          <img src="https://singlecolorimage.com/get/eeeeee/400x100.png" alt="" />
        </div> */}
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.footer_school} ${styles.large}`}>
          <Image src="/footer_logo.png" alt="school logo" width="315" height="90"/>
        </div>
        <div className={`${styles.footer_school} ${styles.single}`}>
          <Image src="/footer_logo_single.png" alt="school logo" width="63" height="77"/>
        </div>
        <div className={styles.footer_content}>
          <h3 style={{gridArea: "event"}}>Events</h3>
          <div className={styles.footer_links} style={{gridArea: "event_links"}}>
            <a href="#">Arena of Valor</a>
            <a href="#">Knock Out</a>
            <a href="#">Truth or Debug</a>
            <a href="#">Log and Blog</a>
            <a href="#">Designscape</a>
            <a href="#">Otakuiz</a>
          </div>
          <h3 style={{gridArea: "links_title"}}>Links</h3>
          <div className={styles.footer_links} style={{gridArea: "links_links"}}>
            <a href="#">Gallery</a>
            <a href="#">Details</a>
            <a href="#">Register Here</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className={styles.footer_details}>
          <p>Arranged by 11th Grade</p>
          <p>Mail: <a href="mailto:nutopia@gmail.com">nutopia@gmail.com</a></p>
          <p></p>
        </div>
        <div className={styles.footer_copyright}>
          Copyright Yuvabharathi Public School 2021 | Template by Team De-Bug
        </div>
      </footer>
    </div>
  )
}

export default Home
