import { NextPage } from "next"
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
import logo from '../../public/images/events/lab_logo_2.png'
//data
import LogAndBlogData from "../../data/pages/events/log-and-blog"

const LogAndBlog: NextPage= () => {
    return(<>
        <HeadTemplate title="NuTopia | Log and Blog" description="NuTopia Events: Log and Blog"/>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_lab}`}>
            
            <div className={styles.banner}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Log and Blog" placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>
            
            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{LogAndBlogData.tagline}</h2>
                
                <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>{LogAndBlogData.headings.about}</p> 

                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date:</strong> {LogAndBlogData.details.date}</p>
                    <p className={styles.h2_p}><strong>Time:</strong> {LogAndBlogData.details.time}</p>
                    <p className={styles.h2_p}><strong>Venue:</strong> {LogAndBlogData.details.venue}</p>
                    
                
                <h2 id="guidelines">Guidelines</h2>
                    <ul className={styles.h2_p}>{LogAndBlogData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    {/* <h3>Assessment Criteria</h3>
                    <ul className={styles.h2_p}>
                        {LogAndBlogData.headings.assessment.map((assessment, index) => {
                            return <li key={index}>
                                <p>{assessment}</p>
                            </li>
                        })}
                    </ul> */}
                
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {LogAndBlogData.headings.eventCoordinators?.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator} colorOverrideSelector={styles.profile_card}/>
                        })}
                    </div>
                    
                <h2 id="registration">Registration</h2>
                    <ul>{LogAndBlogData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>

                <EventsRegisterButton event={toSlug(LogAndBlogData.title)}/>
            </div>
        </Layout>
    </>)
}

export default LogAndBlog