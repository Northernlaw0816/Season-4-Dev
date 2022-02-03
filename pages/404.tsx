import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from 'next/router'

//components
import Layout from "../components/Layout"
//stylesheets
import styles from "../styles/pages/404Page.module.scss"
import Effects from "../styles/Effects.module.scss"

const Custom404: NextPage = () => {

    const router = useRouter()

    return (<>
        <Head>
            <title>NuTopia | Home</title>
            <meta name="description" content="404 | Page Not Found" />
        </Head>

        <Layout skipTo="#content" overrideClasses={styles.main}>
            <div className={styles.main}>
                <h1 id="title">Error 404</h1>
                <h2 id="content">Page Not Found!</h2>
                <p>Sorry, but this page does not exist.</p>
                <div onClick={() => router.back()} className={`${styles.go_home} ${Effects.button_hover_effect}`} tabIndex={0}>Go Back</div>
            </div>
        </Layout>
    </>)
}

export default Custom404