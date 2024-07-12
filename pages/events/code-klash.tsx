import type { NextPage } from "next";
import Image from "next/image";
import { toSlug } from "../../functions";

//components
import HeadTemplate from "../../components/HeadTemplate";
import Layout from "../../components/Layout";
import ProfileCard from "../../components/ProfileCard";
//stylesheet
import styles from "../../styles/pages/Events.module.scss";
import eventStyles from "../../styles/pages/events/ck.module.scss";
//assets
import logo from "../../public/images/events/ck_logo.png";
//data
import EventsRegisterButton from "../../components/EventRegisterButton";
import CodeKlashData from "../../data/pages/events/code-klash";

const CodeKlash: NextPage = () => {
	return (
		<>
			<HeadTemplate title="NuTopia | Code Klash" description="NuTopia Events: Code Klash" />

			<Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.ck} ${eventStyles.main}`}>
				<div className={`${styles.banner} ${eventStyles.banner}`}>
					<div className={`${styles.logo} ${eventStyles.logo}`}>
						<Image src={logo} alt="Code Klash Logo" quality={100} placeholder={"blur"} layout={"responsive"} />
					</div>
				</div>

				<div className={styles.content}>
					<h2 id="tagline" className={`${styles.tagline} ${eventStyles.tagline}`}>
						{CodeKlashData.tagline}
					</h2>

					<h2 id="about">About</h2>
					<p className={`${styles.h2_p} ${styles.description_p}`}>{CodeKlashData.headings.about}</p>

					<h2 id="details">Details</h2>
					<p className={styles.h2_p}>
						<strong>Date:</strong> {CodeKlashData.details.date}
					</p>
					<p className={styles.h2_p}>
						<strong>Time:</strong> {CodeKlashData.details.time}
					</p>
					<p className={styles.h2_p}>
						<strong>Venue:</strong> {CodeKlashData.details.venue}
					</p>

					<h2 id="guidelines">Guidelines</h2>
					<ul>
						{CodeKlashData.headings.rules.map((rule, index) => {
							if (typeof rule === "object") {
								return (
									<li key={index}> {rule[0]}
										<ul>
											{rule.map((subrule, index) => { return (
													index > 0 && (
														<li key={index}>
															<p>{subrule}</p>
														</li>
													));
											})}
										</ul>
									</li>
								);
							}
							return (
								<li key={index}>
									<p>{rule}</p>
								</li>
							);
						})}
					</ul>

					<h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
					<div className={styles.card_container}>
						{CodeKlashData.headings.eventCoordinators.map((coordinator, index) => {
							return <ProfileCard key={index} profileObject={coordinator} />;
						})}
					</div>

					<h2 id="registration">Registration</h2>
					<ul>
						{CodeKlashData.headings.registration.map((rule, index) => {
							return (
								<li key={index}>
									<p>{rule}</p>
								</li>
							);
						})}
					</ul>

					<div className={styles.register_link_align}>
						<EventsRegisterButton text={`Register for ${CodeKlashData.title}`} />
					</div>	
				</div>
			</Layout>
		</>
	);
};
export default CodeKlash;
