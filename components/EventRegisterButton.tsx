import Link from 'next/link'

//stylesheets
import styles from '../styles/pages/Events.module.scss'
import effects from '../styles/Effects.module.scss'

const EventsRegisterButton = () => {
    return(
        <div className={styles.register_link_align}>
            <Link href="/"><a className={`${styles.register_link} ${effects.button_hover_effect}`}>Register Here</a></Link>
        </div>
    )
}

export default EventsRegisterButton