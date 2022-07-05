import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { toSlug } from "../../functions";

//components
import HeadTemplate from "../../components/HeadTemplate";
import Layout from "../../components/Layout";
import ProfileCard from "../../components/ProfileCard";
import EventsRegisterButton from "../../components/EventRegisterButton";
//stylesheet
import styles from "../../styles/pages/Events.module.scss";
//assets
import logo from "../../public/images/events/pandora_blocks.png";
//data
import PandoraBlocksData from "../../data/pages/events/pandora-blocks";
const pandoraBlocks: NextPage = () => {
  return (
    <>
      <HeadTemplate
        title="NuTopia | Pandora Blocks"
        description="NuTopia Events: Pandora Blocks"
      />

      <Layout
        skipTo="#tagline"
        overrideClasses={`${styles.main} ${styles.main_td}`}
      >
        <div className={styles.banner}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Pandora's Blocks" quality={100} placeholder={"blur"} layout={"responsive"}/>
                </div>
            </div>

            <div className={styles.content}>
                <h2 id="tagline" className={styles.tagline}>{PandoraBlocksData.tagline}</h2>

          <h2 id="about">About</h2>
          <p className={`${styles.h2_p} ${styles.description_p}`}>
            {PandoraBlocksData.headings.about}
          </p>

          <h2 id="details">Details</h2>
          <p className={styles.h2_p}>
            <strong>Date:</strong> {PandoraBlocksData.details.date}
          </p>
          <p className={styles.h2_p}>
            <strong>Time:</strong> {PandoraBlocksData.details.time}
          </p>
          <p className={styles.h2_p}>
            <strong>Venue:</strong> {PandoraBlocksData.details.venue}
          </p>

          <h2 id="guidelines">Guidelines</h2>
          <ul>
            {PandoraBlocksData.headings.rules.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
                </li>
              );
            })}
          </ul>

          <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
          <div className={styles.card_container}>
            {PandoraBlocksData.headings.eventCoordinators.map(
              (coordinator, index) => {
                return <ProfileCard key={index} profileObject={coordinator} />;
              }
            )}
          </div>

          <h2 id="registration">Registration</h2>
          <ul>
            {PandoraBlocksData.headings.registration.map((rule, index) => {
              return (
                <li key={index}>
                  <p>{rule}</p>
                </li>
              );
            })}
          </ul>

          <EventsRegisterButton event={toSlug(PandoraBlocksData.title)} />
        </div>
      </Layout>
    </>
  );
};
export default pandoraBlocks;
