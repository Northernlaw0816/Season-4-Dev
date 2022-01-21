import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import toSlug from "../../data/toSlug"

//components
import EventsRegisterButton from "../../components/EventRegisterButton"
import ProfileCard from "../../components/ProfileCard"
//stylesheet
import eventStyles from '../../styles/pages/Events.module.scss'
import Layout from "../../components/Layout"
//assets
import logo from '../../public/images/events/ko_logo.png'
//data
import KnockOutData from "../../data/pages/events/knock-out"

const KnockOut: NextPage= () => {
    return(<>
        <Head>
            <title>NuTopia | Knock Out</title>
            <meta name="description" content="NuTopia Events: Knock Out" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_ko}`}>
            
            <div className={eventStyles.banner}>
                <div className={eventStyles.logo}>
                    <Image src={logo} alt="Knock Out" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>

            <div className={eventStyles.content}>
                <h2 id="tagline" className={eventStyles.tagline}>{KnockOutData.tagline}</h2>
                
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p className={eventStyles.h2_p}>{KnockOutData.headings.about}</p> 
                
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p className={eventStyles.h2_p}>{KnockOutData.headings.rules}</p> 
                
                <h2 id={toSlug("event coordinators")} className={eventStyles.subheading}>Event Coordinators</h2>
                    <div className={eventStyles.card_container}>
                        {KnockOutData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div> 
                
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p className={eventStyles.h2_p}>{KnockOutData.headings.registration}</p>
                
                <EventsRegisterButton/>
            </div>
        </Layout>
    </>)
}

export default KnockOut