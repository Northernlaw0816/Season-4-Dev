import type { NextPage } from 'next'
import Image from 'next/image'

//components
import HeadTemplate from '../components/HeadTemplate'
import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
import Button from '../components/Button'
//stylesheets
import styles from '../styles/pages/Home.module.scss'
import Effects from '../styles/Effects.module.scss'
//data
import { AboutData } from '../data/pages'
import Main from '../data/Main'
import download from '../public/images/icons/arrow.svg'

const Home: NextPage = () => {
	return (<>
		<HeadTemplate title="NuTopia | Yuvabharathi Public School" description={`Official NuTopia Website | Season ${Main.season}`}/>

		<Layout overrideClasses={styles.main}>
		<HomeBanner/>
		{/* <HomeGallery/> */}
		<div className={styles.content_container}>
			{/* trailer */}
			<iframe className={"embed video"} src="https://www.youtube.com/embed/cvLqHBbXSKE" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
			
			<h1>Welcome to NuTopia</h1>
			
			{/* content */}
			<div className={styles.about}>{AboutData.whoWeAre.map((para, index) => {
				return <p key={index}>{para}</p>
			})}</div>
			
			{/* View Events */}
			<div className={styles.navigation}>
				<Button href="/events">View Events</Button>
				<Button  href="/registration">Register</Button>
			</div>
			
			<h1>Brochure</h1>
			{/* brochure */}
			<Button href={Main.brochureDownload}>Download Brochure</Button>
			<iframe style={{aspectRatio: "22/17"}} frameBorder={0} className={"embed pdf"} src={Main.brochurePreview} allow="autoplay"/>
		</div>
		</Layout>
	</>)
}

export default Home
