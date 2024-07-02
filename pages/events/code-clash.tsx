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
import CodeClashData from "../../data/pages/events/code-clash";

const CodeClash: NextPage = () => {
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
                <h2 id="tagline" className={styles.tagline}>{CodeClashData.tagline}</h2>

          <h2 id="about">About</h2>
          <p className={`${styles.h2_p} ${styles.description_p}`}>
            {CodeClashData.headings.about}
          </p>

          <h2 id="details">Details</h2>
          <p className={styles.h2_p}>
            <strong>Date:</strong> {CodeClashData.details.date}
          </p>
          <p className={styles.h2_p}>
            <strong>Time:</strong> {CodeClashData.details.time}
          </p>
          <p className={styles.h2_p}>
            <strong>Venue:</strong> {CodeClashData.details.venue}
          </p>

          <h2 id="guidelines">Guidelines</h2>
          <ul>
            {CodeClashData.headings.rules.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
                </li>
              );
            })}
          </ul>

          <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
          <div className={styles.card_container}>
            {CodeClashData.headings.eventCoordinators.map(
              (coordinator, index) => {
                return <ProfileCard key={index} profileObject={coordinator} />;
              }
            )}
          </div>

          <h2 id="registration">Registration</h2>
          <ul>
            {CodeClashData.headings.registration.map((rule, index) => {
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
export default CodeClash;
