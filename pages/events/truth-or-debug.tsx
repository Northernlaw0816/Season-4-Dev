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
import logo from '../../public/images/events/td_logo.png'
//data
import TruthOrDebugData from "../../data/pages/events/truth-or-debug"

const TruthOrDebug: NextPage = () => {
    return (<>
        <HeadTemplate title="NuTopia | Truth or Debug" description="NuTopia Events: Truth or Debug"/>

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

                {/* <h2 id="finalists">Finalists</h2>
                    {TruthOrDebugData.headings.finalists.map((finalist, index) => {
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
                    })} */}
                
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{TruthOrDebugData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>{TruthOrDebugData.details.dateAndTime.map((date, index) => {
                        return <li key={index}><p>{date}</p></li>
                    })}</ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {TruthOrDebugData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    <ul>{TruthOrDebugData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
                    
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {TruthOrDebugData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} />
                        })}
                    </div>                    
                
                <h2 id="registration">Registration</h2>
                    <ul>{TruthOrDebugData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    
                    <div className={styles.register_link_align}>
                    <EventsRegisterButton pathname="" text={`Register for ${TruthOrDebugData.title}`} />
        </div>
            </div>
        </Layout>

    </>)
}

export default TruthOrDebug
