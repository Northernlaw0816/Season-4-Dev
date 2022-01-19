import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
//components
import Layout from "../components/Layout"
//stylesheets
import styles from "../styles/pages/404Page.module.scss"
import Effects from "../styles/Effects.module.scss"

const Custom404: NextPage = () => {
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
                <Link href="/"><a className={`${styles.go_home} ${Effects.button_hover_effect}`}>Go to Home</a></Link>
            </div>
        </Layout>
    </>)
}

export default Custom404