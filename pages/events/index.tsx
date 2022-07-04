import { NextPage } from "next"

//components
import HeadTemplate from "../../components/HeadTemplate"
import Layout from "../../components/Layout"
import EventCard from "../../components/EventCard"
//stylesheets
import styles from '../../styles/pages/Event.module.scss'
//data
import EventsData from '../../data/EventsList'

const Events: NextPage = () => {
    return(<>
        <HeadTemplate title="NuTopia | Events" description="NuTopia Events"/>

        <Layout overrideClasses={styles.main}>
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