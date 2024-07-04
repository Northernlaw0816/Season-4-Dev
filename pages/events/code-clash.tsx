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
import EventsRegisterButton from "../../components/EventRegisterButton";

const CodeClash: NextPage = () => {
  return (
    <>
      <HeadTemplate
        title="NuTopia | Code Clash"
        description="NuTopia Events: Code Clash"
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
              if (typeof rule === "object") {
                return <li key={index}>
                    {rule[0]}
                    <ul>
                        {rule.map((subrule, index) => {
                            return index > 0 && <li key={index}><p>{subrule}</p></li>
                        })}
                    </ul>
                </li>
            }
            return <li key={index}><p>{rule}</p></li>
        })}</ul> 

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
           <EventsRegisterButton pathname="ASdhahda" text={`Register for ${CodeClashData.title}`}/>
            
        </div>
              </div>
      </Layout>
    </>
  );
};
export default CodeClash;