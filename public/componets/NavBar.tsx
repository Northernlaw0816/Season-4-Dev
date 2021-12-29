import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

//stylesheets
import styles from '../../styles/Navbar.module.scss'
import effects from '../../styles/Effects.module.scss'

const NavBar = () => {

    let [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    let [isMobile, setIsMobile] = useState(false)
    let [windowWidth, setWindowWidth] = useState(0)

    
    function getWindowWidth() {
        const {clientWidth: width} = document.body
        return width
    }
    
    let navMenuDOM: any = useRef(null)
    let toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen)
    }

    function handleResize() {
        setWindowWidth(getWindowWidth())
        setIsMobile(windowWidth <= 600)
        console.log(windowWidth)
    }

    useEffect(() => {
        handleResize()
    })
    
    useLayoutEffect(() => {
        handleResize()
    
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    });

    useEffect(() => {
        if (isMobile) {
            if(isNavMenuOpen) {
                navMenuDOM.current.classList.add(styles.nav_menu_active)
                setTimeout(() => {
                    navMenuDOM.current.classList.add(styles.nav_menu_show)
                    navMenuDOM.current.children[0].classList.add(styles.nav_menu_active)
                }, 100)
            } else {
                navMenuDOM.current.children[0].classList.remove(styles.nav_menu_active)
                navMenuDOM.current.classList.remove(styles.nav_menu_show)
                setTimeout(() => {
                    navMenuDOM.current.classList.remove(styles.nav_menu_active)
                }, 250)
            }
        }
    }, [isNavMenuOpen])

    const FullNav = () => {return(<>
        {/* landscape navbar */}
        <nav className={styles.navbar}>
            <Link href="/"><a aria-label="Nu Topia Home" className={`${styles.nav_button} ${styles.home_button_prt}`}>
                <svg className={styles.home_button} viewBox="0 0 113 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 1">
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
            <span className={styles.spacer}>Season 1</span>
            <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Gallery</a></Link>
            <Link href="/events"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Events</a></Link>
            <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Registration</a></Link>
            <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>About</a></Link>
            <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Contact</a></Link>
        </nav>
        <Link href="#tagline">
            <a tabIndex={0} className={`${styles.skip_to_content} ${effects.button_hover_effect}`}>Skip to Main Content</a>
        </Link>
    </>)}

    const MobNav = () => {return(<>
        {/* mobile navbar */}
        <nav className={styles.navbar_mobile}>
            <Link href="/"><a aria-label="Nu Topia Home" role="link" className={`${styles.nav_button} ${styles.home_button_prt}`}>
                <svg className={styles.home_button} viewBox="0 0 113 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 1">
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
            <span className={styles.spacer}>Season 1</span>
            <div className={`${styles.nav_button} ${styles.ham_menu}`} aria-label="Toggle Navigation Menu" role="button" onClick={() => toggleNavMenu()}>
                <svg className={styles.hamburger} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className={styles.line} id="1" width="32" height="4" fill="white"/>
                    <rect className={styles.line} id="2" width="32" height="4" fill="white" y="14"/>
                    <rect className={styles.line} id="3" width="32" height="4" fill="white" y="28"/>
                </svg>
            </div>
        </nav>
    </>)}

    if (!isMobile) { 
        return (<>
            <FullNav/>
            <div className={styles.nav_menu} ref={navMenuDOM} onClick={() => toggleNavMenu()}>
                <div className={styles.nav_menu_bg}>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Gallery</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Events</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Registration</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>About</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Contact</a></Link>
                </div>
            </div>
        </>)
    } else {
         return(<>
            <MobNav/>
            <div className={styles.nav_menu} ref={navMenuDOM} onClick={() => toggleNavMenu()}>
                <div className={styles.nav_menu_bg}>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Gallery</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Events</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Registration</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>About</a></Link>
                    <Link href="/"><a role="link" className={`${styles.nav_button} ${effects.button_hover_effect}`}>Contact</a></Link>
                </div>
            </div>
        </>)
    }
} 

export default NavBar