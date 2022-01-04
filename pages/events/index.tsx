import { NextPage } from "next"
import Head from "next/head"
import EventCard from "../../public/componets/EventCard"

//components
import Footer from '../../public/componets/Footer'
import NavBar from '../../public/componets/NavBar'
//stylesheets
import styles from '../../styles/Event.module.scss'
import EventsData from '../../public/data/Events'

const Events: NextPage = () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>NuTopia | Events</title>
                <meta name="description" content="NuTopia Events" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <NavBar skipTo="#content"/>
            <main className={styles.main}>
                <h1 id="content">Events</h1>
                <p>This season of NuTopia presents 6 events</p>
                <div className={styles.cards_container}>
                    {EventsData.map(({title, description, date, venue, time, grades, link, image, width, height, accent, background, selector}, index) => {
                        return(
                            <EventCard
                                key={`${index}_${title}`}
                                title={title}
                                description={description}
                                date={date}
                                time={time}
                                venue={venue}
                                grades={grades}
                                link={link}
                                image={image}
                                width={width}
                                height={height}
                                accent={accent}
                                background={background}
                                selector={selector}
                            />
                        )
                    })
                    }
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Events