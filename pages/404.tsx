import { NextPage } from "next"
import { useRouter } from 'next/router'

//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"
//stylesheets
import styles from "../styles/pages/404Page.module.scss"
import Effects from "../styles/Effects.module.scss"

const Custom404: NextPage = () => {

    const router = useRouter()

    return (<>
        <HeadTemplate title="404 Page Not Found" description="404 | Page Not Found"/>

        <Layout overrideClasses={styles.main}>
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