import Link from 'next/link'
import Main from '../data/Main'

//stylesheets
import styles from '../styles/pages/Events.module.scss'

/**
 * Registration button on event page to redirect to registration
 * @param event - Event Title to pass as default event value
*/
const EventsRegisterButton = ({pathname, text}: {pathname: string, text: string}) => {
    return(
        <div className={styles.register_link_align}>
            {Main.registrationClosingDate.getTime() <= new Date().getTime() ? 
                <a className={styles.register_link}>Registrations opening soon!</a>
            :
                <Link href={{
                    pathname,
                }} as={{
                    pathname,
                }}><a className={styles.register_link} target='_blank'><p>{text}</p></a></Link>}
        </div>
    )
}

export default EventsRegisterButton
