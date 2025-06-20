import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toSlug } from '../functions'

//components
import ScrollingUpdate from './ScrollingUpdate'
//stylesheets
import styles from '../styles/components/Navbar.module.scss'
import effects from '../styles/Effects.module.scss'
//data
import NavLinks from '../data/NavLinks'
import EventsList from '../data/EventsList'
import Main from '../data/Main'
import axios from 'axios'

const NavBar = ({skipTo}: {skipTo?: string}) => {

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const router = useRouter()

    /**
     * Gets the window width
     */
    const getWindowWidth = () => {
        const {clientWidth: width} = document.body
        return width
    }
    
    let navMenuDOM: any = useRef(null)
    /**
     * Toggle Nav Menu
     */
    const toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen)
    }

    const handleResize = () => {
        setWindowWidth(getWindowWidth())
        setIsMobile(windowWidth <= 600)
    }

    useEffect(() => {
        handleResize()
    
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    useEffect(() => {
        let toggleNavMenu: any
        if (isMobile) {
            if(isNavMenuOpen) {
                navMenuDOM.current.classList.add(styles.nav_menu_active)
                toggleNavMenu = setTimeout(() => {
                    navMenuDOM.current.classList.add(styles.nav_menu_show)
                    navMenuDOM.current.children[0].classList.add(styles.nav_menu_active)
                }, 100)
            } else {
                navMenuDOM.current.children[0].classList.remove(styles.nav_menu_active)
                navMenuDOM.current.classList.remove(styles.nav_menu_show)
                toggleNavMenu = setTimeout(() => {
                    navMenuDOM.current.classList.remove(styles.nav_menu_active)
                }, 250)
            }
        }
        return () => {clearTimeout(toggleNavMenu)}
    })

    /**
     * Logs out the user and removes the token from local storage
     * @param {boolean} onlyClient - if true, only logout on client (remove userData from localStorage)
     * TODO - Remove this after everyone is confirmed to have been logged out
     */
	const logout = async (userToken:string, onlyClient?: boolean) => {
        let response:any

        if (!onlyClient) {
            response = await axios.post('/api/logout', { userToken: userToken }).then(res => res.data)
        }

        if (response?.success || onlyClient) {
            localStorage.removeItem("userToken")
            localStorage.removeItem("schoolName")
            localStorage.removeItem("schoolId")
            localStorage.removeItem("email")
        }
	}

    /**
     * Checks if the user is logged in and if the userToken matches on the database
     * log them out from client and the also the server if the userToken does match
     * 
     * TODO - Remove this after everyone is confirmed to have been logged out
     */
    const checkLogin = async () => {
        const clientUserToken = localStorage.getItem("userToken")
        if(clientUserToken){
            const response = await axios.post('/api/user', { userToken: clientUserToken }).then(res => res.data).catch(err => {console.log(err)})
            /*
             If userData is valid, then we log them out of the database as well
             Otherwise only the localStorage is cleared
            */
            logout(clientUserToken, !response?.success)
        }
    }


    const Links = ({isMobile}: any) => {

        return (<>
            {NavLinks.map((link: any, index: number) => {
                if (!isMobile && link.name === 'Events'){
                    return <EventsDropdown key={index}/>
                } else {
                    return <Link href={link.link} key={index}><a role="link" className={`${styles.nav_button} ${router.pathname.startsWith(link.link) && styles.active_link}`}>{link.name}</a></Link>
                }
            })}
        </>)
    }

    const EventsDropdown = () => {
        const [isDropActive, setIsDropActive] = useState(false)

        return (
            <div className={styles.dropdown_container} onMouseEnter={() => {setIsDropActive(true)}} onMouseLeave={() => {setTimeout(() => setIsDropActive(false), 60)}}>
                
                <Link href="/events"><a role="link" className={`${styles.nav_button} ${router.pathname.startsWith('/events') && styles.active_link} ${isDropActive && styles.drop_active_link}`}>Events</a></Link>
                
                <div className={styles.dropdown}>
                    {EventsList.map((event, index) => {
                        return <Link href={event.link} key={index}><a role="link" className={`${styles.nav_button} ${styles.drop_button} ${router.pathname == event.link && styles.active_link}`}>{event.title}</a></Link>
                    })}
                </div>
            </div>
        )
    }

    const SkipToContent = () => {
        return(
            <Link href={skipTo || ""}>
                <a tabIndex={1} className={`${styles.skip_to_content}`} style={Main.updateMessage !== "" ? {top: "4.5rem"} : {}} role="link">Skip to Main Content</a>
            </Link>
        )
    }

    const HamMenuBtn = () => {
        return(
            <div className={`${styles.nav_button} ${styles.ham_menu}`} aria-label="Toggle Navigation Menu" role="button" onClick={() => toggleNavMenu()}>
                <svg className={styles.hamburger} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className={styles.line} id="1" width="32" height="4" fill="white"/>
                    <rect className={styles.line} id="2" width="32" height="4" fill="white" y="14"/>
                    <rect className={styles.line} id="3" width="32" height="4" fill="white" y="28"/>
                </svg>
            </div>
        )
    }

    const FullNav = () => {return(<>
        <div className={styles.navbar_layout}>
            <nav className={isMobile ? styles.navbar_mobile : styles.navbar}>
                <Link href="/"><a aria-label="NuTopia Home" role="link" className={`${styles.nav_button} ${styles.home_button_prt}`}>
                    <svg className={styles.home_button} viewBox="0 0 113 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id={toSlug("Group 1")}>
                            <g className={styles.logo_n}>
                                <path d="M0 57L19 0H33L14 57H0Z" fill="#004799" stroke="black" strokeWidth="0" mask="url(#path-1-inside-1_0_1)"/>
                            </g>
                            <g className={styles.logo_v}>
                                <path d="M53.7511 56.8453H41.6493L19 0H33L49.6987 45.7427C57.9886 34.7141 62.1336 24.1296 62.1336 13.9893C62.1336 8.58601 61.3564 3.92292 59.8021 0H73.0697C74.2169 2.96069 74.7906 6.88361 74.7906 11.7688C74.7906 25.3139 67.7774 40.3394 53.7511 56.8453Z" fill="#0070F3" stroke="black" strokeWidth="0" mask="url(#path-2-inside-2_0_1)"/>
                            </g>
                            <g className={styles.logo_u}>
                                <path d="M88.0136 56.8295C83.1629 56.8295 79.4479 55.6582 76.8688 53.3157C74.2896 50.9731 73 47.6959 73 43.4841C73 42.5849 73.0592 41.6503 73.1775 40.6801C73.2958 39.6863 73.4023 38.9528 73.4969 38.4796C73.5916 37.9826 75.0468 31.1561 77.8626 18H88.9719L84.3223 39.8993C84.0857 40.9404 83.9674 41.9815 83.9674 43.0227C83.9674 44.7264 84.4643 45.9923 85.4581 46.8204C86.4519 47.6486 87.7652 48.0627 89.3978 48.0627C91.4801 48.0627 93.1365 47.3883 94.3669 46.0396C95.621 44.6672 96.5438 42.6204 97.1354 39.8993L101.785 18H112.788L108.351 38.8345C107.002 45.2233 104.719 49.8255 101.501 52.6413C98.283 55.4335 93.7872 56.8295 88.0136 56.8295Z" fill="#004799" stroke="black" strokeWidth="0" mask="url(#path-3-inside-3_0_1)"/>
                            </g>
                        </g>
                    </svg>
                    <span className={styles.logo_text}>Topia</span>
                </a></Link>
                <span className={styles.spacer}>{Main.year} | Season {Main.season}</span>
                { isMobile ? <HamMenuBtn/> : <Links/>}
            </nav>
            <ScrollingUpdate message={Main.updateMessage}/>
        </div>
        {(!isMobile && skipTo) && <SkipToContent/>}
    </>)}
 
    return (<>
        <FullNav/>
        {isMobile && 
            <div className={styles.nav_menu} ref={navMenuDOM} onClick={() => toggleNavMenu()}>
                <div className={styles.nav_menu_bg}>
                    <Links isMobile={true} />
                </div>
            </div>
        }
    </>)
} 

export default NavBar