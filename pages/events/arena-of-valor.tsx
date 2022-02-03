import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"
import { toSlug } from "../../functions"

//components
import Layout from "../../components/Layout"
import EventsRegisterButton from "../../components/EventRegisterButton"
import ProfileCard from "../../components/ProfileCard"
//stylesheet
import eventStyles from '../../styles/pages/Events.module.scss'
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

        <Layout skipTo="#tagline" overrideClasses={`${eventStyles.main} ${eventStyles.main_aov}`}>
            
            <div className={eventStyles.banner}>
                
                <div className={eventStyles.logo}>
                    
                    <Image src={logo} alt="Arena of Valor" width={1920} height={1080} quality={100} placeholder={"blur"}/>
                
                </div>
                
                <div className={eventStyles.banner_text}>
                    
                    <h1 id="title">Arena <span>Of</span> Valor</h1>
                
                </div>
            
            </div>
            
            <div className={eventStyles.content}>
                <h2 id="tagline" className={eventStyles.tagline}>{ArenaOfValorData.tagline}</h2>
                
                <h2 id="about" className={eventStyles.subheading}>About</h2>
                    <p className={`${eventStyles.h2_p} ${eventStyles.description_p}`}>
                        {ArenaOfValorData.headings.about.description}
                    </p>
                    
                    {ArenaOfValorData.headings.platforms.map((platform, index: number) => {
                        return (<div key={index}>
                            <h3 id={toSlug(`platform ${platform.name}`)}>
                                {platform.name}
                            </h3>
                            <p className={eventStyles.h3_p}>
                                {platform.description}
                            </p>

                            {platform.games.map((game, index: number) => {
                                return(<div key={index}>
                                    <h4 id={toSlug(`game ${game.name}`)}>{game.name}</h4>
                                    <p className={eventStyles.h3_p}>
                                        <strong>{game.participants}v{game.participants}</strong> {game.name}
                                    </p>
                                    <div className={eventStyles.game_logo}>
                                        <Image src={game.logo} alt={game.name} placeholder={"blur"}/>
                                    </div>
                                </div>)
                            })}
                        </div>)
                    })}

                <h2 id="details" className={eventStyles.subheading}>Details</h2>
                    <p className={`${eventStyles.h2_p} ${eventStyles.description_p}`}>
                        {ArenaOfValorData.details.date}
                    </p>
                
                <h2 id="guidelines" className={eventStyles.subheading}>Guidelines</h2>
                    <ul>{ArenaOfValorData.headings.rules.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul> 
                
                <h2 id={toSlug("event coordinators")} className={eventStyles.subheading}>Event Coordinators</h2>
                    <div className={eventStyles.card_container}>
                        {ArenaOfValorData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div> 
                
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <ul>{ArenaOfValorData.headings.registration.map((rule, index) => {
                        return <li key={index}><p>{rule}</p></li>
                    })}</ul>
                
                <EventsRegisterButton event={toSlug(ArenaOfValorData.title)}/>
            </div>
        </Layout>
    </>)
}

export default ArenaOfValor