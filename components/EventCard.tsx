import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { toSlug } from "../functions"

//stylesheets
import styles from "../styles/pages/EventCards.module.scss"

const EventCard = ({title, description, date, venue, grades, link, image, accent, selector}: any) => {
    
    let card: any = useRef(null)
    
    useEffect(() => {
        if(card.current) {
            let style = card.current.style
            style.setProperty('--accent', accent)
        }
    })

    return (
        <div ref={card} className={styles.card}>
            <h2 id={toSlug(title)}>{title}</h2>
            <div className={[styles.logo, selector].join(" ")}>
                <Image src={image} alt={title} placeholder={"blur"}/>
            </div>
            <div className={styles.info}>
                <p id={toSlug(`${title} description`)}>{description}</p>
                <p id={toSlug(`${title} date`)}><b>Date & Time:</b> {date}</p>
                <p id={toSlug(`${title} venue`)}><b>Venue:</b> {venue}</p>
                <p id={toSlug(`${title} grades`)}><b>Grades:</b> {grades}</p>
                <Link href={link}><a className={styles.read_more}>Go to Event</a></Link>
            </div>
        </div>
    )
}

export default EventCard