import { NextPage } from "next"
import Head from "next/head"

//components
import EventCard from "../../components/EventCard"
//stylesheets
import EventsData from '../../data/EventsList'
import Layout from "../../components/Layout"
import eventStyles from '../../styles/Event.module.scss'

const Events: NextPage = () => {
    return(<>
        <Head>
            <title>NuTopia | Events</title>
            <meta name="description" content="NuTopia Events" />
        </Head>

        <Layout skipTo="#title" overrideClasses={eventStyles.main}>
            <h1 id="title">Events</h1>
            <div className={eventStyles.cards_container}>
                {EventsData.map(({title, description, date, venue, time, grades, link, image, width, height, accent, selector}, index) => {
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
                            selector={selector}
                        />
                    )
                })
                }
            </div>
        </Layout>
    </>)
}

export default Events