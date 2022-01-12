import Image from 'next/image'
import Link from 'next/link'

//stylesheets
import styles from "../styles/Footer.module.scss"
import effects from "../styles/Effects.module.scss"
//assets
import Events from '../data/EventsList'
import YuvaLarge from '../public/images/footer_logo_color.png'
import YuvaSingle from '../public/images/footer_logo_color_single.png'
import TBD from '../public/images/tbd.png'
import NavLinks from '../data/NavLinks'

const Footer = () => {
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
          <p>Phone: <a role="link">+91 82200 59603</a></p>
          <p>E-Mail: <a role="link" href="mailto:nutopia.ybps@gmail.com">nutopia.ybps@gmail.com</a></p>
          <p>Yuvabharathi Public School 17/1. Yuva Enclave, Kanuvai - Thudiyalur Road, Somayampalayam Post, Kanuvai, Coimbatore, Tamil Nadu 641108, India</p>
        </div>
        <div className={styles.footer_copyright}>
          <div><div className={styles.copyright}>©</div> Yuvabharathi Public School 2021</div>
          <div className={styles.separator}></div>
          <div><a role="link" className={styles.TDB} href="https://sites.google.com/view/team-de-bug"><Image src={TBD} alt="team debug logo" width={24} height={24} /></a> Template by Team De-Bug</div>
        </div>
      </footer>
    )
}

export default Footer