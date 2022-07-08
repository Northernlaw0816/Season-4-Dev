import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { toSlug } from "../../functions"

//components
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"
import EventsRegisterButton from "../../components/EventRegisterButton"
import ProfileCard from "../../components/ProfileCard"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
import Effects from '../../styles/Effects.module.scss'
//assets
import logo from '../../public/images/events/ko_logo.png'
//data
import KnockOutData from "../../data/pages/events/knockout"

const KnockOut: NextPage= () => {
    return(<>
        <HeadTemplate title="NuTopia | Knockout" description="NuTopia Events: Knockout"/>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_ko}`}>
            
            <div className={styles.banner}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Knockout" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{KnockOutData.tagline}</h2>
                
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{KnockOutData.headings.about}</p> 
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date:</strong></p>
                    <ul>{KnockOutData.details.dateAndTime.map((dateAndTime, index) => {
                        return <li key={index}><p>{dateAndTime}</p></li>
                    })}</ul>
                    {/* <p className={styles.h2_p}><strong>Time:</strong> {KnockOutData.details.time}</p> */}
                    <p className={styles.h2_p}><strong>Venue:</strong> {KnockOutData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    {KnockOutData.headings.guidelines.map((round: {title: string, rules: string[]}, index) => {
                        return (<div key={index}>
                            <p className={styles.h2_p}><strong>{round.title}</strong></p>
                            <ul className={styles.h2_p}>
                                {round.rules.map((rule: string, index) => {
                                    return (<li key={index}><p>{rule}</p></li>)
                                })}
                            </ul>
                        </div>)
                    })}
                
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {KnockOutData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} colorOverrideSelector={styles.profile_card}/>
                        })}
                    </div> 
                
                <h2 id="registration">Registration</h2>
                    <ul>{KnockOutData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                
                <EventsRegisterButton event={toSlug(KnockOutData.title)}/>
            </div>
        </Layout>
    </>)
}

export default KnockOut