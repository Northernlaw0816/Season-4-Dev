import Head from "next/head"

//components
import Layout from "../components/Layout"
import ProfileCard from "../components/ProfileCard"
//stylesheets
import styles from "../styles/About.module.scss"
//data
import {EventCoordinators, EventHeads} from "../data/EventCoordinators"
import AboutData from "../data/pages/about"

const About = () => {
    return (<>
        <Head>
            <title>NuTopia | Who We Are</title>
            <meta name="description" content="About NuTopia, the Event Heads and the Event Coordinators" />
        </Head>

        <Layout skipTo="#title" overrideClasses={styles.main}>
            <h1 id="title">Who We Are</h1>
                {AboutData.whoWeAre.map((about, index) => {
                    return (<p key={index} className={styles.about_us}>
                        {about}
                    </p>)
                })}
            <hr />
            <h1 id="event heads">Event Heads</h1>
                <div className={`${styles.card_container} ${styles.event_heads}`}>
                    {EventHeads.map((profile, index) => {
                        return <ProfileCard key={index} profileObject={profile}/>
                    })}
                </div>
            
            <hr />
            <h1 id="event coordinators">Event Coordinators</h1>
                <div className={styles.card_container}>
                    {EventCoordinators.map((profile, index) => {
                        return <ProfileCard key={index} profileObject={profile}/>
                    })}
                </div>

        </Layout>
    </>)
}

export default About