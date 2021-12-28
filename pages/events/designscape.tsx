import { NextPage } from "next";

//components
import Footer from '../../public/componets/Footer'
import NavBar from '../../public/componets/NavBar'
//stylesheet
import styles from '../../styles/Home.module.scss'
import eventStyles from '../../styles/Events.module.scss'
import Head from "next/head";

const Designscape: NextPage= () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>Designscape</title>
                <meta name="description" content="NuTopia Events: Designscape" />
            </Head>

            <NavBar/>

            <main className={`${eventStyles.main} ${eventStyles.main_Ds}`}></main>

            <Footer/>
        </div>
    )
}

export default Designscape