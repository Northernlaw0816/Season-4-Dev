import Link from 'next/link'

//stylesheets
import styles from '../styles/pages/Events.module.scss'

const EventsRegisterButton = () => {
    return(
        <div className={styles.register_link_align}>
            <Link href="/"><a className={styles.register_link}>Register Here</a></Link>
        </div>
    )
}

export default EventsRegisterButton