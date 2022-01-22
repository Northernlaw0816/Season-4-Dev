import Image from 'next/image'
import Link from 'next/link'

//stylesheets
import styles from "../styles/components/Footer.module.scss"
import socialStyles from "../styles/components/Socials.module.scss"
import effects from "../styles/Effects.module.scss"
//assets
import Events from '../data/EventsList'
import YuvaLarge from '../public/images/logos/footer_logo_color.png'
import YuvaSingle from '../public/images/logos/footer_logo_color_single.png'
import TDB from '../public/images/logos/tdb.png'
//data
import NavLinks from '../data/NavLinks'
import ContactData from '../data/pages/contact'

const Footer = () => {

    let date = new Date().getFullYear()

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
          
          <p>E-Mail: <a role="link" href={`mailto:${ContactData.contacts.emails[0]}`}>{ContactData.contacts.emails[0]}</a></p>
          
          <p>Phone: {ContactData.contacts.phone}</p>
          
          <div className={socialStyles.social}>
            <p>Socials:</p> 
            
            <div className={socialStyles.icons}>
              {ContactData.socials.map((social, index) => {
                return (
                  <div key={index} className={`${socialStyles.social_icon} ${social.style}`}>
                    <a href={social.link} target="blank">
                      <Image src={social.image} alt="instagram link" width={128} height={128}/>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer_copyright}>
          <div><span className={styles.copyright}>©</span> Yuvabharathi Public School {date}</div>
          
          <div className={styles.separator}></div>
          
          <div><a role="link" className={styles.TDB} href="https://sites.google.com/view/team-de-bug"><Image src={TDB} alt="team debug logo" width={24} height={24} /></a>Website by Team De-Bug</div>
        </div>
      </footer>
    )
}

export default Footer