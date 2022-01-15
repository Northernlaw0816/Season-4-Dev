import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"

//components
import EventsRegisterButton from "../../components/EventRegisterButton"
//stylesheet
import eventStyles from '../../styles/Events.module.scss'
//assets
import logo from '../../public/images/events/otk_logo.png'
import Layout from "../../components/Layout"
import OtakuizData from "../../data/pages/events/otakuiz"

const Otakuiz: NextPage = () => {
    return (<>
        <Head>
            <title>NuTopia | Otakuiz</title>
            <meta name="description" content="NuTopia Events: Otakuiz" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_otk}`}>

            <div className={eventStyles.banner}>
                
                <div className={eventStyles.background}>
                    
                    <div className={eventStyles.banner_background} />
                    
                    <div className={eventStyles.grid_ground}>
                        
                        <div></div>
                    
                    </div>
                
                </div>
                
                <div className={eventStyles.logo} aria-labelledby="title">
                    
                    <Image src={logo} alt="Otakuiz" quality={100} placeholder={"blur"}/>
                
                </div>
            
            </div>
            
            <div className={eventStyles.content}>
                
                <h2 id="tagline" className={eventStyles.tagline}>
                    
                    {OtakuizData.tagline}
                
                </h2>
                
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p>
                        {OtakuizData.headings.about}
                    </p>
                
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p>
                        {OtakuizData.headings.rules}
                    </p>
                
                <h2 id="event-coordinators" className={eventStyles.subheading}>EventCoordinators</h2>
                    <p>
                        {OtakuizData.headings.eventCoordinators}
                    </p>
                
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p>
                        {OtakuizData.headings.registration}
                    </p>
                
                <EventsRegisterButton/>

            </div>

        </Layout>

    </>)
}

export default Otakuiz