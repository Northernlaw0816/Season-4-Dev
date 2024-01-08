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
import logo from '../../public/images/events/td_logo.png'
//data
import { ReactChild, ReactFragment, ReactPortal, Key } from "react"
import PitStopData from "../../data/pages/events/pitstop"

const PitStop: NextPage = () => {
    return (<>
        <HeadTemplate title="NuTopia | PitStop" description="NuTopia Events: PitStop"/>

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
                    <Image src={logo} alt="PitStop" quality={100} placeholder={"blur"}/>
                </div>

                <div className={styles.banner_text}>
                    <h1 id="title">PitStop</h1>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>
                    {PitStopData.tagline}
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
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{PitStopData.headings.about}</p>
                
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>{PitStopData.details.dateAndTime.map((date: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                        return <li key={index}><p>{date}</p></li>
                    })}</ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {PitStopData.details.venue}</p>

                <h2 id="guidelines">Guidelines</h2>
                    <ul>{PitStopData.headings.rules.map((rule: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 

                <h2 id="prerequisites">Prerequisites</h2>
                    <ul>{PitStopData.headings.prerequisites.map((prereq: any, index: any) => {
                        return <li key={index}><p>{prereq}</p></li>
                    })}</ul>
                    
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {PitStopData.headings.eventCoordinators.map((coordinator: any, index: any) => {
                            return <ProfileCard key={index} profileObject={coordinator} />
                        })}
                    </div>                    
                
                <h2 id="registration">Registration</h2>
                    <ul>{PitStopData.headings.registration.map((rule: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    
               <div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations are not yet open</a>
            :
                <Link href={{
                    pathname: "https://forms.gle/j4HxF5Taf4dd46zR6",
                    hash: "registration-form"
                }} as={{
                    pathname: "https://forms.gle/j4HxF5Taf4dd46zR6",
                    hash: "registration-form"
                }}><a className={styles.register_link}><p>Register Here</p></a></Link>}
        </div>
            </div>
        </Layout>

    </>)
}

export default PitStop