import type { NextPage } from "next"
import Head from 'next/head'
import Image from "next/image"
import toSlug from "../../data/toSlug"

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
                
                <h2 id="about" className={eventStyles.subheading}>About<span></span></h2>
                    <p className={eventStyles.h2_p}>
                        {ArenaOfValorData.headings.about.description}
                    </p>
                    
                    {ArenaOfValorData.headings.platforms.map((platform) => {
                        return (<>
                            <h3 id={toSlug(`platform ${platform.name}`)}>
                                {platform.name}
                            </h3>
                            <p className={eventStyles.h3_p}>
                                {platform.description}
                            </p>

                            {platform.games.map((game) => {
                                return(<>
                                    <p className={eventStyles.h3_p}>
                                        <strong>{game.participants}v{game.participants}</strong> {game.name}
                                    </p>
                                    <div className={eventStyles.game_logo}>
                                        <Image src={game.logo} alt={game.name} placeholder={"blur"}/>
                                    </div>
                                </>)
                            })}
                        </>)
                    })}

                    {/* <h3 id={toSlug("platform console")}>
                        Console
                    </h3>
                        <p className={eventStyles.h3_p}>
                        </p>
                    
                    <h3 id={toSlug("platform mobile")}>
                        Mobile
                    </h3>
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.mobile[0]}
                        </p>
                        <div className={eventStyles.mobile}>
                            <Image src={cod}  alt="Call Of Duty Mobile" width={300} height={233*0.5}/>
                        </div>
                        
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.mobile[1]}
                        </p>
                        <div className={eventStyles.mobile}>
                            <Image src={bgmi} alt="Call Of Duty Mobile" width={300} height={455*0.21}/>
                        </div>
                        
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.mobile[2]}
                        </p>
                    
                    <h3 id={toSlug("platform pc")}>
                        PC
                    </h3>
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.pc[0]}
                        </p>
                        
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.pc[1]}
                        </p>
                        
                        <p className={eventStyles.h3_p}>
                            {ArenaOfValorData.headings.about.pc[2]}
                        </p> */}
                
                <h2 id="rules" className={eventStyles.subheading}>Rules</h2>
                    <p className={eventStyles.h2_p}>{ArenaOfValorData.headings.rules}</p> 
                
                <h2 id={toSlug("event coordinators")} className={eventStyles.subheading}>Event Coordinators</h2>
                    <div className={eventStyles.card_container}>
                        {ArenaOfValorData.headings.eventCoordinators.map((coordinator, index) => {
                            return <ProfileCard key={index} profileObject={coordinator}/>
                        })}
                    </div> 
                
                <h2 id="registration" className={eventStyles.subheading}>Registration</h2>
                    <p className={eventStyles.h2_p}>{ArenaOfValorData.headings.registration}</p>
                
                <EventsRegisterButton/>
            </div>
        </Layout>
    </>)
}

export default ArenaOfValor