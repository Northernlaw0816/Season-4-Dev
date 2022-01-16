import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"

//stylesheets
import styles from '../styles/Contact.module.scss'
//assets
import campus from '../public/images/school_campus.jpg'
//data
import AboutData from "../data/pages/about"

const Contact = () => {
    return (<>
        <Head>
            <title>NuTopia | Contact Us</title>
        </Head>
        <Layout skipTo="#school" additionalClasses={styles.main}>
            <h1 id="title">Contact Us</h1>
            <div className={styles.layout}>
                <h2 id="school" className={styles.school_name}>Yuvabharathi Public School</h2>
                <div className={styles.campus}>
                    <Image src={campus} alt="Yuvabharathi Public School Campus" layout={"responsive"}/>
                </div>
                <div className={`${styles.contact_section} ${styles.addr}`}>
                    <h2>Address</h2>
                    <p>{AboutData.contacts.address}</p>
                </div>
                <div className={`${styles.contact_section} ${styles.email}`}>
                    <h2>E-Mail</h2>
                    <p><a href={`mailto:${AboutData.contacts.email}`}>{AboutData.contacts.email}</a></p>
                </div>
                <div className={`${styles.contact_section} ${styles.phone}`}>
                    <h2>Phone</h2>
                    <p>{AboutData.contacts.phone}</p>
                </div>
            </div>
        </Layout>
    </>)
}

export default Contact