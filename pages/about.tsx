import { toSlug } from "../functions"

//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"
import ProfileCard from "../components/ProfileCard"
import SMProfile from "../components/SMProfile"
//stylesheets
import styles from "../styles/pages/About.module.scss"
//data
import {EventCoordinators, EventHeads, MediaTeam, EventMentors} from "../data/EventCoordinators"
import { AboutData } from "../data/pages"

const About = () => {
    return (<>
        <HeadTemplate title="NuTopia | Who We Are" description="About NuTopia, the Event Heads and the Event Coordinators"/>

        <Layout overrideClasses={styles.main}>
            <h1 id="title">Who We Are</h1>
                {AboutData.whoWeAre.map((about, index) => {
                    return (<p key={index} className={styles.about_us}>
                        {about}
                    </p>)
                })}

            <hr />

            <h1 id={toSlug("event heads")}>Event Heads</h1>
                <div className={`${styles.card_container} ${styles.event_heads}`}>
                    {EventHeads.map((profile, index) => {
                        return <ProfileCard key={index} profileObject={profile}/>
                    })}
                </div>
            
            <hr />

            <h1 id={toSlug("Event Mentors")}>Event Mentors</h1>
                <div className={styles.card_container}>
                    {EventMentors.map((profile, index) => {
                        return <ProfileCard key={index} profileObject={profile}/>
                    })}
                </div>
            
            <hr />
            
            <h1 id={toSlug("event coordinators")}>Event Coordinators</h1>
                <div className={styles.card_container}>
                    {EventCoordinators.map((profile, index) => {
                        return <ProfileCard key={index} profileObject={profile}/>
                    })}
                </div>

            <hr />

            <h1 id={toSlug("Social Media Team")}>Social Media Team</h1>
                <div className={styles.card_container}>
                    {MediaTeam.map((profile, index) => {
                        return <SMProfile key={index} profileObject={profile}/>
                    })}
                </div>

        </Layout>
    </>)
}

export default About
