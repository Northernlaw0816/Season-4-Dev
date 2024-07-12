import { ReactNode } from "react";

//components
import HeadTemplate from "../components/HeadTemplate";
import Layout from "../components/Layout";
import Button from "../components/Button";
//stylesheets
import styles from "../styles/pages/Registration.module.scss";
//data
import { RegistrationData } from "../data/pages";

const Registration = () => {
	return (
		<>
			<HeadTemplate title="NuTopia | Registration" description="Register for the events featured in NuTopia" />

			<Layout overrideClasses={styles.main}>
				<h1 id="title">{RegistrationData.title}</h1>

				<p id="note" style={{ fontSize: "1.5em" }}>
					NuTopia - Season 4 is open for schools in Coimbatore.
				</p>
				<p id="note" style={{ fontSize: "1.5em" }}>
					Please read the given guidelines under each event before proceeding to fill the registration form.
				</p>

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
				<p>To register for an event:</p>
				<Button href="/events" text="Browse Events" />
			</Layout>
		</>
	);
};

export default Registration;
