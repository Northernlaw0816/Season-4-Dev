import type { NextPage } from 'next'
import Link from 'next/link'

//components
import HeadTemplate from '../components/HeadTemplate'
import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
//stylesheets
import styles from '../styles/pages/Home.module.scss'
import Effects from '../styles/Effects.module.scss'
//data
import { AboutData } from '../data/pages'
import Main from '../data/Main'

const Home: NextPage = () => {
	return (<>
		<HeadTemplate title="NuTopia | Yuvabharathi Public School" description="Official NuTopia Website | Season ${Main.season}"/>

		<Layout skipTo="#content" overrideClasses={styles.main}>
		<HomeBanner/>
		{/* <HomeGallery/> */}
		<div className={styles.content_container}>
			{/* trailer */}
			<iframe className={"embed video"} src="https://www.youtube.com/embed/cvLqHBbXSKE" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
			<hr />
			<h1>Welcome to NuTopia</h1>
			{/* content */}
			<div className={styles.about}>{AboutData.whoWeAre.map((para, index) => {
			return <p key={index}>{para}</p>
			})}</div>
			{/* View Events */}
			<div className={styles.navigation}>
			<Link href="/events"><a className={`${styles.button} ${Effects.button_hover_effect}`}>View Events</a></Link>
			<Link href="/registration"><a className={`${styles.button} ${Effects.button_hover_effect}`}>Register</a></Link>
			</div>
			<hr />
			<h1>Brochure</h1>
			{/* brochure */}
			<a href={Main.brochureDownload} className={`${styles.button} ${Effects.button_hover_effect}`}>Download Brochure</a>
			<iframe style={{aspectRatio: "22/17"}} frameBorder={0} className={"embed pdf"} src={Main.brochurePreview} allow="autoplay"/>
		</div>
		</Layout>
	</>)
}

export default Home
