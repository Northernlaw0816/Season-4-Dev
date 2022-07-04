//stylesheets
import styles from '../styles/components/Banner.module.scss'
//components
import Logo from './Logo'

const HomeBanner = () => {
    return (
        <div className={styles.banner}>
            <Logo />
        </div>
    )
}

export default HomeBanner