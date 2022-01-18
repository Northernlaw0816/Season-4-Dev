import Image from 'next/image'

//stylesheets
import styles from '../styles/components/Banner.module.scss'
//assets
import logo from '../public/images/logos/nutopia.png'

const Logo = () => {
    return (
        <div className={styles.container}>
            <svg className={styles.svg} width="87.15" height="87.15" viewBox="0 0 87.15 87.15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={styles.v} d="M54.2844 87.1504H35.3802L0 0H21.8693L47.9541 70.1289C60.9037 53.2208 67.3784 36.9935 67.3784 21.4472C67.3784 13.1633 66.1645 6.01428 63.7364 0H84.4618C86.2532 4.53908 87.15 10.5534 87.15 18.0429C87.15 38.8092 76.1951 61.845 54.2844 87.1504Z" fill="#FFCF24"/>
            </svg>
            <div className={styles.logo_img}>
                <h1 id="welcome">Welcome To</h1>
                <Image src={logo} alt="NuTopia Logo" quality={100} priority={true}/>
            </div>
        </div>
    )
}

export default Logo