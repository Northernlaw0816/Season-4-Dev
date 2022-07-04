import Image from "next/image"
import { toSlug } from "../functions"

//stylesheets
import styles from "../styles/components/ProfileCard.module.scss"

const ProfileCard = ({profileObject}: any) => {

    const {name, roles, src} = profileObject

    return (
        <div className={styles.profile_card}>
            <div className={styles.profile_pic}>
                <Image src={src} alt={name} quality={2} placeholder={"blur"} layout={"responsive"}/>
            </div>
            <div className={styles.profile_info}>
                <h2 id={toSlug(name)} className={styles.profile_name}>{name}</h2>
                <div className={styles.profile_details}>
                    {roles && <span className={styles.info}>
                        <h3 id={toSlug(`profile ${roles}`)}>Role</h3><p>{roles}</p>
                    </span>}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard