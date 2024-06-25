import type { NextPage } from "next";
import Image from "next/image";
import { toSlug } from "../../functions";
import Main from "../../data/Main"
import Link from "next/link"

//components
import HeadTemplate from "../../components/HeadTemplate";
import Layout from "../../components/Layout";
import ProfileCard from "../../components/ProfileCard";
//stylesheet
import styles from "../../styles/pages/Events.module.scss";
//assets
import logo from "../../public/images/events/pandora_blocks.png";
//data
import TechTriviaData from "../../data/pages/events/tech-trivia";

const TechTrivia: NextPage = () => {
  return (
    <>
      <HeadTemplate
        title="NuTopia | Tech Trivia"
        description="NuTopia Events: Tech Trivia  "
      />

      <Layout
        skipTo="#tagline"
        overrideClasses={`${styles.main} ${styles.main_pb}`}
      >
        <div className={styles.banner}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Pandora's Blocks" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{TechTriviaData.tagline}</h2>

          <h2 id="about">About</h2>
          <p className={`${styles.h2_p} ${styles.description_p}`}>
            {TechTriviaData.headings.about}
          </p>

          <h2 id="details">Details</h2>
          <p className={styles.h2_p}>
            <strong>Date:</strong> {TechTriviaData.details.date}
          </p>
          <p className={styles.h2_p}>
            <strong>Time:</strong> {TechTriviaData.details.time}
          </p>
          <p className={styles.h2_p}>
            <strong>Venue:</strong> {TechTriviaData.details.venue}
          </p>

          <h2 id="guidelines">Guidelines</h2>
          <ul>
            {TechTriviaData.headings.rules.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
                </li>
              );
            })}
          </ul>

          <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
          <div className={styles.card_container}>
            {TechTriviaData.headings.eventCoordinators.map(
              (coordinator, index) => {
                return <ProfileCard key={index} profileObject={coordinator} />;
              }
            )}
          </div>

          <h2 id="registration">Registration</h2>
          <ul>
            {TechTriviaData.headings.registration.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
                </li>
              );
            })}
          </ul>

          <div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations are not yet open</a>
            :
                <Link href={{
                    pathname: "https://forms.gle/BrQcVuHAEcH29zWp6",
                    hash: "registration-form"
                }} as={{
                    pathname: "https://forms.gle/BrQcVuHAEcH29zWp6",
                    hash: "registration-form"
                }}><a className={styles.register_link}><p>Register Here</p></a></Link>}
            
        </div>
              </div>
      </Layout>
    </>
  );
};
export default TechTrivia;
