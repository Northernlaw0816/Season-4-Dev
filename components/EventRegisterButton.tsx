import Link from 'next/link'
import Main from '../data/Main'

//stylesheets
import styles from '../styles/pages/Events.module.scss'

/**
 * Registration button on event page to redirect to registration
 * @param event - Event Title to pass as default event value
*/
const EventsRegisterButton = ({event}: {event: string}) => {
    return(
        <div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations Closed</a>
            :
                <Link href={{
                    pathname: "/registration",
                    query: {event: event},
                    hash: "registration-form"
                }} as={{
                    pathname: "/registration",
                    hash: "registration-form"
                }}><a className={styles.register_link}><p>Register Here</p></a></Link>}
        </div>
    )
}

export default EventsRegisterButton