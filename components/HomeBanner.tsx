import styles from '../styles/Banner.module.scss'
import Logo from './Logo'

const HomeBanner = () => {
    return (
        <div className={styles.banner}>
            <Logo />
        </div>
    )
}

export default HomeBanner