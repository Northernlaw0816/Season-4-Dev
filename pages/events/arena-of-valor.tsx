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
import logo from '../../public/images/events/aov_logo.png'
import brawl from '../../public/images/events/aov_logo.png'

const ArenaOfValor: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Arena of Valor</title>
                <meta name="description" content="NuTopia Events: Arena of Valor" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <NavBar skipTo="#tagline"/>

            <main className={`${eventStyles.main} ${eventStyles.main_aov}`}>
                <div className={eventStyles.banner}>
                    <div className={eventStyles.logo}>
                        <Image src={logo} alt="Arena of Valor" width={1920} height={1080} quality={100} placeholder={"blur"}/>
                    </div>
                    <div className={eventStyles.banner_text}>
                        <h1 id="title">Arena <span>Of</span> Valor</h1>
                    </div>
                </div>
                <div className={eventStyles.content}>
                    <h2 id="tagline" className={eventStyles.tagline}>Grab the Clutch and Feel the Power</h2>
                    <h2 id="about" className={eventStyles.subheading}>About <span></span></h2>
                        <p className={eventStyles.h2_p}>
                            Split second descisions, Highspeed reflexes all required to emerge victorious in the Arena of Valor.
                            Gaming takes time,patience and effort it isnt easy at all. Never underestimate a gamer’s abilities. 
                            For the first time ever an opporutunity is given to the students to showcase their gaming skills so don’t waste the chance.
                        </p>
                        <h3>
                            Console
                        </h3>
                            <p className={eventStyles.h3_p}>
                                Arena of Valor: Console participants will have to run a gauntlet of several games that will truly test their versatility and experience as players. 
                            </p>
                        <h3>
                            Mobile
                        </h3>
                            <p className={eventStyles.h3_p}>
                                <b>3v3:</b> Call Of Duty Mobile
                            </p>
                            <Image src={brawl} alt="Call Of Duty Mobile" width={1920*0.3125} height={1080*0.3125}/>
                            <p className={eventStyles.h3_p}>
                                <b>3v3:</b> BGMI
                            </p>
                            <Image src={brawl} alt="Call Of Duty Mobile" width={1920*0.3125} height={1080*0.3125}/>
                            <p className={eventStyles.h3_p}>
                                Arena of Valor: Mobile offers intense team-based combat and strategy, all within a device that fits in the palm of the hand
                            </p>
                        <h3>
                            PC
                        </h3>
                            <p className={eventStyles.h3_p}>
                                <b>3v3:</b> Valorant<br/>
                                <b>3v3:</b> Brawlhalla
                            </p>
                            <p className={eventStyles.h3_p}>
                                Arena of Valor: PC demands a sharp mind and a patient trigger finger.
                            </p>
                    <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                        <p className={eventStyles.h2_p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                    <h2 id="event-coordinators" className={eventStyles.subheading}>Event Coordinators</h2>
                        <p className={eventStyles.h2_p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                    <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                        <p className={eventStyles.h2_p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p>
                        <EventsRegisterButton/>
                </div>
            </main>

            <Footer/>

        </div>
    )
}

export default ArenaOfValor