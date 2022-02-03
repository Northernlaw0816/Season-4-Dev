import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { toSlug } from "../../functions"

//components
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
        <Head>
            <title>NuTopia | Log and Blog</title>
            <meta name="description" content="NuTopia Events: Log and Blog" />
        </Head>

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

                <h2>Details</h2>
                    
                
                <h2 id="guidelines">Guidelines</h2>
                    <ul>{LogAndBlogData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                    <h3>Assessment Criteria</h3>
                
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {LogAndBlogData.headings.eventCoordinators?.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
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