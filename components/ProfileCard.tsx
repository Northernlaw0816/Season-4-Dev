import Image from "next/image"
import { toSlug } from "../functions"

//stylesheets
import styles from "../styles/components/ProfileCard.module.scss"

const ProfileCard = ({profileObject}: any) => {

    const {name, roles, event, src} = profileObject

    return (
        <div className={styles.profile_card}>
            <div className={styles.profile_pic}>
                <Image src={src} alt={name} quality={50} placeholder={"blur"} layout={"responsive"}/>
            </div>
            <div className={styles.profile_info}>
                <h2 id={toSlug(name)} className={styles.profile_name}>{name}</h2>
                <div className={styles.profile_details}>
                    {event && <span className={styles.info}>
                        <h3 id={toSlug(`profile ${event}`)}>Event</h3><p>{event}</p>
                    </span>}
                    {roles && <span className={styles.info}>
                        <h3 style={{display: "none"}} id={toSlug("profile role")}>Role</h3>
                        {roles.map((role: string, index: number) => {
                            return <p key={index}>{role}</p>
                        })}
                    </span>}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard