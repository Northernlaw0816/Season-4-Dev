import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

//components
import Layout from "../../components/Layout"
import ProfileCard from "../../components/ProfileCard"
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import eventStyles from '../../styles/Events.module.scss'
//assets
import logo from '../../public/images/events/lab_logo.png'
//data
import LogAndBlogData from "../../data/pages/events/log-and-blog"
const LogAndBlog: NextPage= () => {
    return(<>
        <Head>
            <title>NuTopia | Log and Blog</title>
            <meta name="description" content="NuTopia Events: Log and Blog" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_lab}`}>
            
            <div className={eventStyles.banner}>
                <div className={eventStyles.logo}>
                    <Image src={logo} alt="Log and Blog" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>
            
            <div className={eventStyles.content}>
                <h2 id="tagline" className={eventStyles.tagline}>{LogAndBlogData.tagline}</h2>
                
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p className={eventStyles.h2_p}>{LogAndBlogData.headings.about}</p> 
                
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p className={eventStyles.h2_p}>{LogAndBlogData.headings.rules}</p> 
                
                <h2 id="event-coordinators" className={eventStyles.subheading}>Event Coordinators</h2>
                    <div className={eventStyles.card_container}>
                        {LogAndBlogData.headings.eventCoordinators?.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div>
                    
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p className={eventStyles.h2_p}>{LogAndBlogData.headings.registration}</p>

                <EventsRegisterButton/>
            </div>
        </Layout>
    </>)
}

export default LogAndBlog