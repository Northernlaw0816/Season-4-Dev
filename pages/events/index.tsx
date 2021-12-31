import { NextPage } from "next"
import Head from "next/head"

//components
import Footer from '../../public/componets/Footer'
import NavBar from '../../public/componets/NavBar'
//stylesheets
import styles from '../../styles/Event.module.scss'

const Events: NextPage = () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>NuTopia Events</title>
                <meta name="description" content="NuTopia Events" />
            </Head>

            <NavBar skipTo="#content"/>
            <main className={styles.main}>
                <h1 id="content">Events</h1>
            </main>
            <Footer/>
        </div>
    )
}

export default Events