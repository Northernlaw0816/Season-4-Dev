//components
import Footer from "./Footer"
import NavBar from "./NavBar"
import HomeBanner from "./HomeBanner"
//stylesheets
import styles from "../styles/pages/Home.module.scss"

const Layout = ({skipTo, additionalClasses, overrideClasses, children}: {skipTo?: string, additionalClasses?: string, overrideClasses?: string, children: any}) => {
    return (<>
        <NavBar skipTo={skipTo}/>
        <main className={overrideClasses ? overrideClasses : `${styles.main} ${additionalClasses}`}>{children}</main>
        <Footer/>
    </>) : 
    (<>
        <main className={styles.main}><HomeBanner/></main>
    </>)
}

export default Layout