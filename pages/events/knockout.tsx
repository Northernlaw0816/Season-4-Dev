import { NextPage } from "next"
import Image from "next/image"
import { toSlug } from "../../functions"
import Main from "../../data/Main"
import Link from "next/link"
//components
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"
import EventsRegisterButton from "../../components/EventRegisterButton"
import ProfileCard from "../../components/ProfileCard"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
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
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>{KnockOutData.details.date.map((date, index) => {
                        return <li key={index}><p>{date}</p></li>
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
                            return <ProfileCard key={index} profileObject={coordinator} />
                        })}
                    </div> 
                
                <h2 id="registration">Registration</h2>
                    <ul>{KnockOutData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                
                div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations are not yet open</a>
            :
                <Link href={{
                    pathname: "https://docs.google.com/forms/d/1aghaNK5JS72quAAb4s-Q7EOTis7Fg2p1GXN7kzstRng/edit",
                    hash: "registration-form"
                }} as={{
                    pathname: "https://docs.google.com/forms/d/1aghaNK5JS72quAAb4s-Q7EOTis7Fg2p1GXN7kzstRng/edit",
                    hash: "registration-form"
                }}><a className={styles.register_link}><p>Register Here</p></a></Link>}
            </div>
        </Layout>
    </>)
}

export default KnockOut
