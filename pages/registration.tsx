import Link from "next/link"
import { toSlug } from "../functions"
import { ReactNode } from "react"

//components
import HeadTemplate from "../components/HeadTemplate"
import Layout from "../components/Layout"
import RegistrationForm from "../components/RegistrationForm"
//stylesheets
import styles from "../styles/pages/Registration.module.scss"
//data
import { RegistrationData } from "../data/pages"
import Main from "../data/Main"
import Button from "../components/Button"

const Registration = () => {
    return (<>
        <HeadTemplate title="NuTopia | Registration" description="Register for the events featured in NuTopia"/>

        <Layout overrideClasses={styles.main}>
            <h1 id="title">{RegistrationData.title}</h1>
            <p id="note" style={{fontSize: "1.5em"}}>NuTopia - Season 4 is open to all schools!</p>
            <p id="note" style={{fontSize: "1.5em"}}>Please read the given guidelines before proceeding to fill the registration form.</p>

            <h2 id="guidelines">Guidelines</h2>
            <ul>
            {RegistrationData.commonRules.map((rule: string | ReactNode, index: number) => {
						if (typeof rule === "string")
							return (
								<li key={index}>
									<p>{rule}</p>
								</li>
							);
						return <div className={styles.info_image} key={index}>{rule}</div>;
					})}
            </ul>

            <h2 id="registration">Registration</h2>
            <Button>Register Here</Button>
        </Layout>
    </>)
}

export default Registration
