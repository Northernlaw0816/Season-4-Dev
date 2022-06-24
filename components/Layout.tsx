//components
import Footer from "./Footer"
import NavBar from "./NavBar"
import HomeBanner from "./HomeBanner"
//stylesheets
import styles from "../styles/pages/Home.module.scss"

const Layout = ({additionalClasses, overrideClasses, landingPage, children}: any) => {
     return (<>
        <NavBar/>
        <main className={overrideClasses ? overrideClasses : `${styles.main} ${additionalClasses}`}>{children}</main>
        <Footer/>
    </>)
}

export default Layout