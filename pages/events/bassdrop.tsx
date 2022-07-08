import type { NextPage } from "next"
import Image from "next/image"
import { toSlug } from "../../functions"

//components
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"
import ProfileCard from "../../components/ProfileCard"
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
//assets
import logo from '../../public/images/events/bass_drop.png'
//data
import BassDropData from "../../data/pages/events/bassdrop"

const BassDrop: NextPage = () => {
    return (<>
        <HeadTemplate title="NuTopia | Bass Drop" description="NuTopia Events: Bass Drop"/>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_bd}`}>

        <div className={styles.banner}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Bass Drop" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
                <div className={styles.banner_text}>
                    <h1 id="title">Bass Drop</h1>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{BassDropData.tagline}</h2>
                
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{BassDropData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date:</strong> {BassDropData.details.date}</p>
                    <p className={styles.h2_p}><strong>Time:</strong> {BassDropData.details.time}</p>
                    <p className={styles.h2_p}><strong>Venue:</strong> {BassDropData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    <ul>{BassDropData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
                    
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {BassDropData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} colorOverrideSelector={styles.profile_card}/>
                        })}
                    </div>                    
                
                <h2 id="registration">Registration</h2>
                    <ul>{BassDropData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    
                <EventsRegisterButton event={toSlug(BassDropData.title)}/>
            </div>
        </Layout>

    </>)
}

export default BassDrop