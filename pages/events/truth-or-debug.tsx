import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"

//components
import Layout from "../../components/Layout"
import ProfileCard from "../../components/ProfileCard"
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import eventStyles from '../../styles/Events.module.scss'
//assets
import logo from '../../public/images/events/td_logo.png'
//data
import TruthOrDebugData from "../../data/pages/events/truth-or-debug"

const TruthOrDebug: NextPage = () => {
    return (<>
        <Head>
            <title>NuTopia | Truth or Debug</title>
            <meta name="description" content="NuTopia Events: Truth or Debug" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_td}`}>

            <div className={eventStyles.banner}>
                <div className={eventStyles.overlay}/>
                <div className={eventStyles.banner_text}>
                    <div className={eventStyles.command_line}>
                        {`> run TD.sh`}
                        <div className={eventStyles.type_cursor} />
                    </div>
                </div>

                <div className={eventStyles.logo}>
                    <Image src={logo} alt="Truth or Debug" quality={100} placeholder={"blur"}/>
                </div>

                <div className={eventStyles.banner_text}>
                    <h1 id="title">Truth or Debug</h1>
                </div>
            </div>

            <div className={eventStyles.content}>
                <h2 id="tagline" className={eventStyles.tagline}>
                    {TruthOrDebugData.tagline}
                </h2>
                
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p className={eventStyles.h2_p}>{TruthOrDebugData.headings.about}</p>
                
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p className={eventStyles.h2_p}>{TruthOrDebugData.headings.rules}</p>
               
                <h2 id="event-coordinators" className={eventStyles.subheading}>Event Coordinators</h2>
                    <div className={eventStyles.card_container}>
                        {TruthOrDebugData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div>                    
                
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p className={eventStyles.h2_p}>{TruthOrDebugData.headings.registration}</p>
                    
                <EventsRegisterButton/>
            </div>
        </Layout>

    </>)
}

export default TruthOrDebug