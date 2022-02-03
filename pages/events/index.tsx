import { NextPage } from "next"
import Head from "next/head"

//components
import Layout from "../../components/Layout"
import EventCard from "../../components/EventCard"
//stylesheets
import styles from '../../styles/pages/Event.module.scss'
//data
import EventsData from '../../data/EventsList'

const Events: NextPage = () => {
    return(<>
        <Head>
            <title>NuTopia | Events</title>
            <meta name="description" content="NuTopia Events" />
        </Head>

        <Layout skipTo="#title" overrideClasses={styles.main}>
            <h1 id="title">Events</h1>
            
            <div className={styles.cards_container}>
                {EventsData.map(({title, description, date, venue, time, grades, link, image, accent, selector}, index) => {
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
                            accent={accent}
                            selector={selector}
                        />
                    )
                })}
            </div>
        </Layout>
    </>)
}

export default Events