import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"
import { toSlug } from "../../functions"

//components
import Layout from "../../components/Layout"
import EventsRegisterButton from "../../components/EventRegisterButton"
import ProfileCard from "../../components/ProfileCard"
//stylesheet
import styles from '../../styles/pages/Events.module.scss'
//assets
import logo from '../../public/images/events/aov_logo.png'
//data
import ArenaOfValorData from "../../data/pages/events/arena-of-valor"

const ArenaOfValor: NextPage = () => {

    return (<>
        <Head>
            <title>NuTopia | Arena of Valor</title>
            <meta name="description" content="NuTopia Events: Arena of Valor" />
        </Head>

        <Layout skipTo="#tagline" overrideClasses={`${styles.main} ${styles.main_aov}`}>
            
            <div className={styles.banner}>
                
                <div className={styles.logo}>
                    
                    <Image src={logo} alt="Arena of Valor" width={1920} height={1080} quality={100} placeholder={"blur"}/>
                
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
                    
                    {ArenaOfValorData.headings.platforms.map((platform, index: number) => {
                        return (<div key={index}>
                            <h3 id={toSlug(`platform ${platform.name}`)}>
                                {platform.name}
                            </h3>
                            <p className={styles.h3_p}>
                                {platform.description}
                            </p>

                            {platform.games.map((game, index: number) => {

                                return(<div key={index}>
                                    <h4 id={toSlug(`game ${game.name}`)}>{game.name}</h4>
                                    <div className={styles.game_logo}>
                                        <Image src={game.image} alt={game.name} placeholder={"blur"}/>
                                    </div>
                                    <h5 id={toSlug(`${game.name} details`)}>Details</h5>
                                    <p className={styles.h5_p}>Team Size: {game.participants}</p>
                                    {game.bannedItems?.length > 0 && (<>
                                        <p className={styles.h5_p}>Banned Items:</p>
                                        <ul>
                                            { game.bannedItems?.map(category => {
                                                return(<>
                                                    <p>{category.category}</p>
                                                    <ul>
                                                        {category.items.map((item, index) => {
                                                            return (<li key={index}>{item}</li>)
                                                        })}
                                                    </ul>
                                                </>)
                                            })}
                                        </ul>
                                    </>)}
                                </div>)
                            })}

                            <h4 id={toSlug(`${platform} guidelines`)}>Guidelines</h4>
                            <ul className={styles.h4_p}>
                                {platform.guidelines.map((rule, index) => {
                                    return <li key={index}>{rule}</li>
                                })}
                            </ul>
                        </div>)
                    })}
                    
                <h2 id="details">Details</h2>
                    <p className={styles.h2_p}><strong>Date:</strong> {ArenaOfValorData.details.date}</p>
                    <p className={styles.h2_p}><strong>Time:</strong></p>
                        <ul className={styles.h2_p}>
                            {ArenaOfValorData.details.times.map((time, index) => {
                                return (<li key={index}><strong>{time.name}:</strong> {time.time} </li>)
                            })}
                        </ul>
                    <p className={styles.h2_p}><strong>Venue:</strong> {ArenaOfValorData.details.venue}</p>
                
                <h2 id="guidelines">Guidelines</h2>
                    <ul>{ArenaOfValorData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
                
                <h2 id={toSlug("event coordinators")}>Event Coordinators</h2>
                    <div className={styles.card_container}>
                        {ArenaOfValorData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div> 
                
                <h2 id="registration">Registration</h2>
                    <ul>{ArenaOfValorData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                
                <EventsRegisterButton event={toSlug(ArenaOfValorData.title)}/>
            </div>
        </Layout>
    </>)
}

export default ArenaOfValor