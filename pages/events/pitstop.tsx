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
//import logo from '../../public/images/events/ps_logo.png'
//data
import PitstopData from "../../data/pages/events/pitstop"

const Pitstop: NextPage = () => {
    return (<>
        <HeadTemplate title="NuTopia | Pitstop" description="NuTopia Events: Pitstop"/>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_ps}`}>

            <div className={styles.banner}>
                <div className={styles.overlay}/>
                <div className={styles.banner_text}>
                    <div className={styles.command_line}>
                    </div>
                </div>

{/*}                <div className={styles.logo}>
                    <Image src={logo} alt="Pitstop" quality={100} placeholder={"blur"}/>
                    COLORL: #febf01;
                </div>*/}

                <div className={styles.banner_text}>
                    <h1 id="title"></h1>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>
                    {PitstopData.tagline}
                </h2>

                {/* <h2 id="finalists">Finalists</h2>
                    {PitstopData.headings.finalists.map((finalist, index) => {
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
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{PitstopData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>{PitstopData.details.dateAndTime.map((date, index) => {
                        return <li key={index}><p>{date}</p></li>
                    })}</ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {PitstopData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    <ul>{PitstopData.headings.rules.map((rule, index) => {
                        if (typeof rule === "object") {
                            return <li key={index}>
                                {rule[0]}
                                <ul>
                                    {rule.map((subrule, index) => {
                                        return index > 0 && <li key={index}><p>{subrule}</p></li>
                                    })}
                                </ul>
                            </li>
                        }
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 

{/*                <h2 id="prerequisites">Prerequisites</h2>
                    <ul>{PitstopData.headings.prerequisites.map((prereq, index) => {
                        return <li key={index}><p>{prereq}</p></li>
                    })}</ul>*/}
                    
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {PitstopData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} />
                        })}
                    </div>                    
                
                <h2 id="registration">Registration</h2>
                    <ul>{PitstopData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    
                    <div className={styles.register_link_align}>
                    <EventsRegisterButton text={`Register for ${PitstopData.title}`}/>
        </div>
            </div>
        </Layout>

    </>)
}

export default Pitstop
