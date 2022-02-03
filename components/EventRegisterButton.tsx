import Link from 'next/link'

//stylesheets
import styles from '../styles/pages/Events.module.scss'

/**
 * Registration button on event page to redirect to registration
 * @param event - Event TItle to pass as default event value
*/
const EventsRegisterButton = ({event}: {event: string}) => {
    return(
        <div className={styles.register_link_align}>
            <Link href={{pathname: "/registration", query: {event: event}, hash: "registration-form"}} as={{pathname: "/registration", hash: "registration-form"}}><a className={styles.register_link}>Register Here</a></Link>
        </div>
    )
}

export default EventsRegisterButton