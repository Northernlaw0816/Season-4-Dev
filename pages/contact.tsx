import Head from "next/head"
import Image from "next/image"
import toSlug from "../data/toSlug"

//components
import Layout from "../components/Layout"
//stylesheets
import styles from '../styles/pages/Contact.module.scss'
import socialStyles from '../styles/components/Socials.module.scss'
import Effects from "../styles/Effects.module.scss"
//assets
import campus from '../public/images/school_campus.jpg'
import tdb_logo from '../public/images/logos/team_debug_logo.png'
//data
import ContactData from "../data/pages/contact"
import ProfileCard from "../components/ProfileCard"

export const Contact = () => {
    return (<>
        <Head>
            <title>NuTopia | Contact Us</title>
        </Head>
        <Layout skipTo="#school" additionalClasses={styles.main}>
            <h1 id="title">Contact Us</h1>
            <div className={styles.layout}>
                <h2 id="school" className={styles.school_name}>Yuvabharathi Public School</h2>
                <div className={styles.campus}>
                    <Image src={campus} alt="Yuvabharathi Public School Campus" placeholder={"blur"} layout={"responsive"}/>
                </div>
                <div className={`${styles.contact_section} ${styles.addr}`}>
                    <h2>Address</h2>
                    <p>{ContactData.contacts.address}</p>
                </div>
                <div className={`${styles.contact_section} ${styles.email}`}>
                    <h2 id="email">E-Mail</h2>
                    {ContactData.contacts.emails.map((email, index) => {
                        return <p key={index}><a className={Effects.link_hover_effect} href={`mailto:${email}`}>{email}</a></p>
                    })}
                </div>
                <div className={`${styles.contact_section} ${styles.phone}`}>
                    <h2 id="phone">Phone</h2>
                    <p>{ContactData.contacts.phone}</p>
                </div>
                <div className={`${styles.contact_section} ${socialStyles.social} ${styles.social}`}>
                    <h2 id="social">Socials</h2> 
                    <div className={`${socialStyles.icons} ${styles.icons}`}>
                        {ContactData.socials.map((social, index) => {
                            return (
                                <div key={index} className={`${socialStyles.social_icon} ${styles.social_icon} ${social.style}`}>
                                    <a href={social.link} target="blank">
                                        <Image src={social.image} alt="instagram link" width={128} height={128}/>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <hr/>
            <h2 id={toSlug("Team De-Bug heading")} style={{display: "none"}}>Team De-Bug</h2>
            <div className={styles.tdb_section}>
                <div id={toSlug("Team De-Bug")} aria-labelledby={toSlug("Team De-Bug heading")} className={styles.tdb_logo}>
                    <Image src={tdb_logo} alt="Team De-Bug Logo" quality={100} layout={"responsive"}/>
                </div>
                <div className={styles.card_container}>
                    {ContactData.teamDeBug.profiles.map((member, index) => {
                        return <ProfileCard key={index} profileObject={member}/>
                    })}
                </div>
                <div className={`${socialStyles.social} ${styles.tdb_social}`}>
                <h3>Connect With Us</h3>
                    <div className={`${socialStyles.icons} ${styles.tdb_icons}`}>
                        {ContactData.teamDeBug.socials.map((social, index) => {
                            return (
                                <div key={index} className={`${socialStyles.social_icon} ${styles.tdb_social_icons} ${social.style}`}>
                                    <a href={social.link} target="blank">
                                        <Image src={social.image} alt="instagram link" width={128} height={128}/>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <a className={`${styles.tdb_email} ${Effects.link_hover_effect}`} href={`mailto:${ContactData.teamDeBug.mail}`}>{ContactData.teamDeBug.mail}</a>
                </div>
            </div>
        </Layout>
    </>)
}

export default Contact