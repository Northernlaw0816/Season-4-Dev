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
<<<<<<<< HEAD:pages/events/code-clash.tsx
import CodeClashData from "../../data/pages/events/code-clash";
import EventsRegisterButton from "../../components/EventRegisterButton";

const CodeClash: NextPage = () => {
  return (
    <>
      <HeadTemplate
        title="NuTopia | Code Clash"
        description="NuTopia Events: Code Clash"
========
import TechTriviaData from "../../data/pages/events/tech-trivia";

const TechTrivia: NextPage = () => {
  return (
    <>
      <HeadTemplate
        title="NuTopia | Tech Trivia"
        description="NuTopia Events: Tech Trivia  "
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
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
<<<<<<<< HEAD:pages/events/code-clash.tsx
                <h2 id="tagline" className={styles.tagline}>{CodeClashData.tagline}</h2>

          <h2 id="about">About</h2>
          <p className={`${styles.h2_p} ${styles.description_p}`}>
            {CodeClashData.headings.about}
========
                <h2 id="tagline" className={styles.tagline}>{TechTriviaData.tagline}</h2>

          <h2 id="about">About</h2>
          <p className={`${styles.h2_p} ${styles.description_p}`}>
            {TechTriviaData.headings.about}
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
          </p>

          <h2 id="details">Details</h2>
          <p className={styles.h2_p}>
<<<<<<<< HEAD:pages/events/code-clash.tsx
            <strong>Date:</strong> {CodeClashData.details.date}
          </p>
          <p className={styles.h2_p}>
            <strong>Time:</strong> {CodeClashData.details.time}
          </p>
          <p className={styles.h2_p}>
            <strong>Venue:</strong> {CodeClashData.details.venue}
========
            <strong>Date:</strong> {TechTriviaData.details.date}
          </p>
          <p className={styles.h2_p}>
            <strong>Time:</strong> {TechTriviaData.details.time}
          </p>
          <p className={styles.h2_p}>
            <strong>Venue:</strong> {TechTriviaData.details.venue}
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
          </p>

          <h2 id="guidelines">Guidelines</h2>
          <ul>
<<<<<<<< HEAD:pages/events/code-clash.tsx
            {CodeClashData.headings.rules.map((rule, index) => {
              if (typeof rule === "object") {
                return <li key={index}>
                    {rule[0]}
                    <ul>
                        {rule.map((subrule, index) => {
                            return index > 0 && <li key={index}><p>{subrule}</p></li>
                        })}
                    </ul>
========
            {TechTriviaData.headings.rules.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
                </li>
            }
            return <li key={index}><p>{rule}</p></li>
        })}</ul> 

          <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
          <div className={styles.card_container}>
<<<<<<<< HEAD:pages/events/code-clash.tsx
            {CodeClashData.headings.eventCoordinators.map(
========
            {TechTriviaData.headings.eventCoordinators.map(
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
              (coordinator, index) => {
                return <ProfileCard key={index} profileObject={coordinator} />;
              }
            )}
          </div>

          <h2 id="registration">Registration</h2>
          <ul>
<<<<<<<< HEAD:pages/events/code-clash.tsx
            {CodeClashData.headings.registration.map((rule, index) => {
========
            {TechTriviaData.headings.registration.map((rule, index) => {
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
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
<<<<<<<< HEAD:pages/events/code-clash.tsx
export default CodeClash;
========
export default TechTrivia;
>>>>>>>> 9c21029 (AAAAAH):pages/events/tech-trivia.tsx
