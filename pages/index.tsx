import type { NextPage } from 'next'

//components
import HeadTemplate from '../components/HeadTemplate'
import Layout from '../components/Layout'
import HomeBanner from '../components/HomeBanner'
import Button from '../components/Button'
//stylesheets
import styles from '../styles/pages/Home.module.scss'
import landingStyles from '../styles/pages/LandingPage.module.scss'
import Effects from '../styles/Effects.module.scss'
//data
import { AboutData } from '../data/pages'
import Main from '../data/Main'

const Home: NextPage = () => {

	const showLandingPage = true

	if (showLandingPage) {
		return <>
			<HeadTemplate title="NuTopia | Coming Soon..." description={`Keep your eye out for Season ${Main.season}`} />
			<div className={landingStyles.landing_banner}>
				<div className={landingStyles.overlay}>
					<div className={landingStyles.overlay_left}></div>
					<div className={landingStyles.overlay_right}></div>
				</div>
				<div className={landingStyles.hero}>
					<span className={landingStyles.text}>Coming Soon</span>
				</div>
			</div>
		</>
	}

	return (<>
		<HeadTemplate title="NuTopia | Yuvabharathi Public School" description={`Official NuTopia Website | Season ${Main.season}`}/>

		<Layout overrideClasses={styles.main}>
		<HomeBanner/>
		{/* <HomeGallery/> */}
		<div className={styles.content_container}>
			{/* trailer */}
			<iframe className={"embed video"} src="https://www.youtube.com/embed/9zXfdEVTX_o" title="Nutopia Season 3" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

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
