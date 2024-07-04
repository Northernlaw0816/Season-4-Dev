import Image from "next/image"
import { toSlug } from "../functions"

//stylesheets
import styles from "../styles/components/ProfileCard.module.scss"
import eventStyles from "../styles/pages/Events.module.scss"

const   ProfileCard = ({profileObject}: any) => {

    const {name, event, roles, src} = profileObject

    return (
        <div className={`${styles.profile_card} ${eventStyles.profile_card}`}>
            <div className={`${styles.profile_pic} ${eventStyles.profile_pic}`}>
                <Image src={src} alt={name} quality={5} placeholder={"blur"} layout={"responsive"}/>
            </div>
            <div className={styles.profile_info}>
                <h2 id={toSlug(name)} className={styles.profile_name}>{name}</h2>
                <div className={styles.profile_details}>
                    {roles && <div className={styles.info}>
                        <h3 id={toSlug(`profile ${roles}`)}>{roles}</h3>
                    </div>}
                    {event && <div className={styles.info}>
                        <h3 id={toSlug(`profile ${event}`)}>Event</h3><p>{event}</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard