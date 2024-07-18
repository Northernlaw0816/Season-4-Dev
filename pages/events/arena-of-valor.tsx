import type { NextPage } from "next";
import Image from "next/image";
import { toSlug } from "../../functions";
//components
import HeadTemplate from "../../components/HeadTemplate";
import Layout from "../../components/Layout";
import EventsRegisterButton from "../../components/EventRegisterButton";
import ProfileCard from "../../components/ProfileCard";
//stylesheet
import styles from '../../styles/pages/Events.module.scss';
//assets
import logo from '../../public/images/events/aov_logo.png';
//data
import ArenaOfValorData from "../../data/pages/events/arena-of-valor";

const ArenaOfValor: NextPage = () => {
    return (
        <>
            <HeadTemplate title="NuTopia | Arena of Valor" description="NuTopia Events: Arena of Valor" />

            <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_aov}`}>

                <div className={styles.banner}>

                    <div className={styles.logo}>

                        <Image src={logo} alt="Arena of Valor" width={1920} height={1080} quality={100} placeholder={"blur"} />

                    </div>

                    <div className={styles.banner_text}>

                        <h1 id="title">Arena <span>Of</span> Valor</h1>

                    </div>

                </div>

                <div className={styles.content}>
                    <h2 id="tagline" className={styles.tagline}>{ArenaOfValorData.tagline}</h2>

                    <h2 id="about">About</h2>
                    <p className={`${styles.h2_p} ${styles.description_p}`}>
                        {ArenaOfValorData.headings.about.description}
                    </p>

                    <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date and Time:</strong></p>
                    <ul>
                        {ArenaOfValorData.details.date.map((date, index) => (
                            <li key={index}><p>{date}</p></li>
                        ))}
                    </ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {ArenaOfValorData.details.venue}</p>

                    <h2 id="common-guidelines">Common Guidelines</h2>
                    <ul>
                        {ArenaOfValorData.headings.commonGuidelines.map((rule, index) => (
                            <li key={index}><p>{rule}</p></li>
                        ))}
                    </ul>

                    {ArenaOfValorData.headings.platforms.map((platform, index: number) => (
                        <div key={index}>
                            <h2 id={toSlug(`platform ${platform.name}`)}>
                                {platform.name}
                            </h2>
                            <p className={styles.h3_p}>
                                {platform.description}
                            </p>

                            {platform.games.map((game, gameIndex: number) => {
                                let pathname = '';

                                // Conditionally assign pathname based on game.name
                                if (game.name === "Battlegrounds Mobile India (BGMI)") {
                                    pathname = "https://forms.gle/99w3t59dsL3dcsK39";
                                } else if (game.name === "Call of Duty Mobile") {
                                    pathname = "https://forms.gle/twSLFhDSUmKgFvUk9";
                                } else if (game.name === "Free Fire") {
                                    pathname = "https://forms.gle/YspfignDfcd1yAMD9";
                                } else if (game.name === "Minecraft") {
                                    pathname = "https://forms.gle/5a2VEsg57xHd1dRM7";
                                } else if (game.name === "Valorant") {
                                    pathname = "https://forms.gle/DgcWByxUV23roA6h8";
                                } else if (game.name === "FIFA-23") {
                                    pathname = "https://forms.gle/HGJAFnHms666AmBS7";
                                } else {
                                    pathname = "";
                                }

                                return (
                                    <div key={gameIndex}>
                                        <h4 id={toSlug(`game ${game.name}`)}>{game.name}</h4>
                                        <div className={styles.game_logo}>
                                            <img src={`/images/events/aov_games/${game.image}`} alt={game.name} placeholder={"blur"} />
                                        </div>
                                        <h5 id={toSlug(`${game.name} details`)}>Details</h5>
                                        <p className={styles.h5_p}>Team Size: {game.participants}</p>
                                        <h5 id={toSlug(`${game.name} guidelines`)}>Guidelines</h5>
                                        <ul className={styles.h4_p}>
                                            {game.guidelines.map((rule, ruleIndex) => (
                                                <li key={ruleIndex}>{rule}</li>
                                            ))}
                                        </ul>
                                        <h5 id={toSlug(`${platform.name} registration`)}>Registration</h5>
                                        <EventsRegisterButton pathname={pathname} text={`Register for ${game.name}`} />
                                    </div>
                                );
                            })}

                            <h4 id={toSlug("event coordinators")}>Event Coordinators</h4>
                            <div className={styles.card_container}>
                                {platform.eventCoordinators.map((coordinator, coordinatorIndex) => (
                                    <ProfileCard key={coordinatorIndex} profileObject={coordinator} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <h2 id="guidelines">Guidelines</h2>
                    <ul>
                        {ArenaOfValorData.headings.rules.map((rule, index) => (
                            <li key={index}><p>{rule}</p></li>
                        ))}
                    </ul>
                </div>
            </Layout>
        </>
    );
}

export default ArenaOfValor;