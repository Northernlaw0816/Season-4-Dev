import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"
import { toSlug } from "../../functions"

//components
import Layout from "../../components/Layout"
import ProfileCard from "../../components/ProfileCard"
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
//assets
import logo from '../../public/images/events/td_logo.png'
//data
import TruthOrDebugData from "../../data/pages/events/truth-or-debug"

const TruthOrDebug: NextPage = () => {
    return (<>
        <Head>
            <title>NuTopia | Truth or Debug</title>
            <meta name="description" content="NuTopia Events: Truth or Debug" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_td}`}>

            <div className={styles.banner}>
                <div className={styles.overlay}/>
                <div className={styles.banner_text}>
                    <div className={styles.command_line}>
                        {`> run TD.sh`}
                        <div className={styles.type_cursor} />
                    </div>
                </div>

                <div className={styles.logo}>
                    <Image src={logo} alt="Truth or Debug" quality={100} placeholder={"blur"}/>
                </div>

                <div className={styles.banner_text}>
                    <h1 id="title">Truth or Debug</h1>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>
                    {TruthOrDebugData.tagline}
                </h2>
                
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{TruthOrDebugData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date:</strong> {TruthOrDebugData.details.date}</p>
                    <p className={styles.h2_p}><strong>Time:</strong> {TruthOrDebugData.details.time}</p>
                    <p className={styles.h2_p}><strong>Venue:</strong> {TruthOrDebugData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    <ul>{TruthOrDebugData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
               
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {TruthOrDebugData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div>                    
                
                <h2 id="registration">Registration</h2>
                    <ul>{TruthOrDebugData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    
                <EventsRegisterButton event={toSlug(TruthOrDebugData.title)}/>
            </div>
        </Layout>

    </>)
}

export default TruthOrDebug