import Image from "next/image"
import styles from "../styles/ProfileCard.module.scss"

const ProfileCard = ({profileObject}: any) => {

    const {name, grade, event, src} = profileObject

    return (
        <div className={styles.profile_card}>
            <div className={styles.profile_pic}>
                <Image src={src} alt={name} quality={50} placeholder={"blur"} layout={"responsive"}/>
            </div>
            <div className={styles.profile_info}>
                <h2 className={styles.profile_name}>{name}</h2>
                <div className={styles.profile_details}>
                    {event && <span className={styles.info}>
                        <h3>Event:</h3><p>{event}</p>
                    </span>}
                    <span className={styles.info}>
                        <h3>Grade:</h3><p>{grade}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard