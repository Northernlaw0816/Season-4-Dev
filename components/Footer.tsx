import Image from 'next/image'
import Link from 'next/link'

//stylesheets
import styles from "../styles/Footer.module.scss"
import effects from "../styles/Effects.module.scss"
//assets
import Events from '../data/EventsList'
import YuvaLarge from '../public/images/logos/footer_logo_color.png'
import YuvaSingle from '../public/images/logos/footer_logo_color_single.png'
import TBD from '../public/images/logos/tbd.png'
import NavLinks from '../data/NavLinks'
//data
import AboutData from '../data/pages/about'

const Footer = () => {

    let date = new Date().getFullYear()
    console.log(date)

    return(
        <footer className={styles.footer}>
        <a role="link" className={styles.footer_school} href="https://yuvabharathi.in">
          <div className={styles.large}>
            <Image src={YuvaLarge} alt="school logo" width={315} height={90}/>
          </div>
          <div className={styles.single}>
            <Image src={YuvaSingle} alt="school logo" width={63} height={77}/>
          </div>
        </a>
        <div className={styles.footer_content}>
          <label style={{gridArea: "event"}}>Events</label>
          <div className={styles.footer_links} style={{gridArea: "event_links"}}>
            {Events.map((event, index) => {
              return (
                <Link href={event.link} key={index}><a role="link" className={effects.link_hover_effect}>{event.title}</a></Link>
              )
            })}
          </div>
          <label style={{gridArea: "links_title"}}>Links</label>
          <div className={styles.footer_links} style={{gridArea: "links_links"}}>
            {NavLinks.map((link: any, index: number) => {
              return (
                <Link href={link.link} key={index}><a role="link" className={effects.link_hover_effect}>{link.name}</a></Link>
              )
            })}
          </div>
        </div>
        <div className={styles.footer_details}>
          <p>An Initiative By The Students For The Students</p>
          <p>Phone: <a role="link">{AboutData.contacts.phone}</a></p>
          <p>E-Mail: <a role="link" href={`mailto:${AboutData.contacts.email}`}>{AboutData.contacts.email}</a></p>
          <p>{AboutData.contacts.address}</p>
        </div>
        <div className={styles.footer_copyright}>
          <div><div className={styles.copyright}>©</div> Yuvabharathi Public School {date}</div>
          <div className={styles.separator}></div>
          <div><a role="link" className={styles.TDB} href="https://sites.google.com/view/team-de-bug"><Image src={TBD} alt="team debug logo" width={24} height={24} /></a>Template by Team De-Bug</div>
        </div>
      </footer>
    )
}

export default Footer