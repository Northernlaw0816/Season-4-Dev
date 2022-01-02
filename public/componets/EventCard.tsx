import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import styles from "../../styles/Event.module.scss"

const EventCard = ({title, description, date, time, venue, grades, link, image, accent}: any) => {
    
    let card: any = useRef(null)
    
    useEffect(() => {
        if(card.current) {
            card.current.style.setProperty('--accent', accent);
        }
    })

    return (
        <div ref={card} className={styles.card}>
            <h2>{title}</h2>
            <div className={styles.logo}>
                <Image src={image} alt={title} width={1920} height={1080}/>
            </div>
            <div className={styles.info}>
                <p>{description}</p>
                <p><b>Date:</b> {date}</p>
                <p><b>Time:</b> {time}</p>
                <p><b>Venue:</b> {venue}</p>
                <p><b>Grades:</b> {grades}</p>
                <Link href={link}><a className={styles.read_more}>Go to Event</a></Link>
            </div>
        </div>
    )
}

export default EventCard