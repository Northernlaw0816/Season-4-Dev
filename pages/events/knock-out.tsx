import { NextPage } from "next";

//components
import Footer from '../../public/componets/Footer'
import NavBar from '../../public/componets/NavBar'
//stylesheet
import styles from '../../styles/Home.module.scss'
import eventStyles from '../../styles/Events.module.scss'
import Head from "next/head";

const KnockOut: NextPage= () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>Knock Out</title>
                <meta name="description" content="NuTopia Events: Knock Out" />
            </Head>

            <NavBar/>

            <main className={`${eventStyles.main} ${eventStyles.main_ko}`}></main>

            <Footer/>
        </div>
    )
}

export default KnockOut