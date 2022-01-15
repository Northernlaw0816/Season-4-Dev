import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

//components
import EventsRegisterButton from "../../components/EventRegisterButton"
import Layout from "../../components/Layout"
//stylesheet
import eventStyles from '../../styles/Events.module.scss'
import styles from '../../styles/Home.module.scss'
const LogAndBlog: NextPage= () => {
    return(<>
        <Head>
            <title>NuTopia | Log and Blog</title>
            <meta name="description" content="NuTopia Events: Log and Blog" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_lab}`}>
            <div className={eventStyles.banner}>
                <div className={eventStyles.logo}>
                    {/* <Image src={logo} alt="Arena of Valor" quality={100} placeholder={"blur"}/> */}
                </div>
                <div className={eventStyles.banner_text}>
                    <h1 id="title">Arena <span>Of</span> Valor</h1>
                </div>
            </div>
            <div className={eventStyles.content}>
                <h2 id="tagline" className={eventStyles.tagline}>Grab the Clutch and Feel the Power</h2>
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                <h2 id="event-coordinators" className={eventStyles.subheading}>Event Coordinators</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p> 
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?</p>
                    <EventsRegisterButton/>
            </div>
        </Layout>
    </>)
}

export default LogAndBlog