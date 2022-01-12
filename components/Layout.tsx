import Footer from "./Footer"
import NavBar from "./NavBar"
import styles from "../styles/Home.module.scss"

const Layout = ({skipTo, additionalClasses, overrideClasses, children}: any) => {
    return (<>
        <NavBar skipTo={skipTo}/>
        <main className={overrideClasses ? overrideClasses : `${styles.main} ${additionalClasses}`}>{children}</main>
        <Footer/>
    </>)
}

export default Layout