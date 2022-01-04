import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"

//components
import Footer from '../../public/componets/Footer'
import NavBar from '../../public/componets/NavBar'
import EventsRegisterButton from "../../public/componets/EventRegisterButton"
//stylesheet
import styles from '../../styles/Home.module.scss'
import eventStyles from '../../styles/Events.module.scss'
//assets
import logo from '../../public/images/events/td_logo.png'

const TruthOrDebug: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>NuTopia | Truth or Debug</title>
                <meta name="description" content="NuTopia Events: Truth or Debug" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <NavBar skipTo="#tagline"/>

            <main className={`${eventStyles.main} ${eventStyles.main_td}`}>
                <div className={eventStyles.banner}>
                    <div className={eventStyles.overlay}/>
                    <div className={eventStyles.banner_text}>
                        <p>
                            {`> run TD.sh`}
                            <div className={eventStyles.type_blocker} />
                        </p>
                    </div>
                    <div className={eventStyles.logo}>
                        <Image src={logo} alt="Truth or Debug" quality={100} placeholder={"blur"}/>
                    </div>
                    <div className={eventStyles.banner_text}>
                        <h1 id="title">Truth or Debug</h1>
                    </div>
                </div>
                <div className={eventStyles.content}>
                    <h2 id="tagline" className={eventStyles.tagline}><span className={eventStyles.grey}>{`print(`}</span>{`"`}I have not failed, I have found 10,000 ways how not to solve a problem{`"`}<span className={eventStyles.grey}>{`);`}</span></h2>
                    <h2 id="about" className={eventStyles.subheading}>About</h2>
                        <p>Are you Sherlock Holmes when it comes to spotting coding errors? then this competition is for you! prepare to put your skills to test in this exciting event!</p> 
                    <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                    <h2 id="event-coordinators" className={eventStyles.subheading}>Event Coordinators</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                    <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p>
                        <EventsRegisterButton/>
                </div>
            </main>

            <Footer/>

        </div>
    )
}

export default TruthOrDebug