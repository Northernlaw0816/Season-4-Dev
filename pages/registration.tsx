import Link from "next/link"
import { toSlug } from "../functions"

//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"
import RegistrationForm from "../components/RegistrationForm"
//stylesheets
import styles from "../styles/pages/Registration.module.scss"
//data
import { RegistrationData } from "../data/pages"
import Main from "../data/Main"

const Registration = () => {
    return (<>
        <HeadTemplate title="NuTopia | Registration" description="Register for the events featured in NuTopia"/>

        <Layout overrideClasses={styles.main}>
            <h1 id="title">{RegistrationData.title}</h1>

            <p id="note" style={{fontSize: "1.5em"}}>NuTopia - Season 4 is open for schools in Coimbatore.</p>
            <p id="note" style={{fontSize: "1.5em"}}>Please read the given guidelines before proceeding to fill the registration form under each event.</p>

            <h2>Common Guidelines</h2>
            <ul>
                {RegistrationData.commonRules.map((rule: string, index: number) => <li key={index}><p>{rule}</p></li>)}
            </ul>

            <RegistrationForm EventTitle="code-clash"/>

        </Layout>
    </>)
}

export default Registration
