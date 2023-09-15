import type { NextPage } from "next"
import Image from "next/image"
import { toSlug } from "../../functions"
import Main from "../../data/Main"
import Link from "next/link"
//components
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"
import ProfileCard from "../../components/ProfileCard"
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
//assets
import logo from '../../public/images/events/otk_logo.png'
//data
import OtakuizData from "../../data/pages/events/otakuiz"

const Otakuiz: NextPage = () => {
    return (<>
        <HeadTemplate title="NuTopia | Otakuiz" description="NuTopia Events: Otakuiz"/>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_otk}`}>

            <div className={styles.banner}>
                <div className={styles.background}>
                    <div className={styles.banner_background} />
                    <div className={styles.grid_ground}>
                        <div></div>
                    </div>
                </div>
                
                <div className={styles.logo} aria-labelledby="title">
                    <Image src={logo} alt="Otakuiz" quality={100} placeholder={"blur"}/>
                </div>
            </div>
            
            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{OtakuizData.tagline}</h2>

                {/* <h2 id="finalists">Finalists</h2>
                    {OtakuizData.headings.finalists.map((finalist, index) => {
                        return(<div key={index}>
                            <h3>{finalist.teamName}</h3>
                            <ol className={styles.h3_p}>
                                {finalist.members.map((member, index) => {
                                    return <li key={index}>
                                        {member.name} | {member.grade}
                                    </li>
                                })}
                            </ol>
                        </div>)
                    })}
                 */}
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{OtakuizData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>{OtakuizData.details.date.map((date, index) => {
                        return <li key={index}><p>{date}</p></li>
                    })}</ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {OtakuizData.details.venue}</p>
                
                <h2 id="guidelines">Guidelines</h2>
                    <ul>{OtakuizData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
                
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {OtakuizData.headings.eventCoordinators?.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} />
                        })}
                    </div>
                
                <h2 id="registration">Registration</h2>
                    <ul>{OtakuizData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>

                <div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations are not yet open</a>
            :
                <Link href={{
                    pathname: "https://docs.google.com/forms/d/1vgApRag8cwVMvE7XMJOhLJWErUO-Sy1Eer1pIktsJVw/edit",
                    hash: "registration-form"
                }} as={{
                    pathname: "https://docs.google.com/forms/d/1vgApRag8cwVMvE7XMJOhLJWErUO-Sy1Eer1pIktsJVw/edit",
                    hash: "registration-form"
                }}><a className={styles.register_link}><p>Register Here</p></a></Link>}
        </div>
            </div>
        </Layout>
    </>)
}

export default Otakuiz
