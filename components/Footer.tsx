import Image from 'next/image'
import Link from 'next/link'

//stylesheets
import styles from "../styles/components/Footer.module.scss"
import socialStyles from "../styles/components/Socials.module.scss"
import effects from "../styles/Effects.module.scss"
//assets
import YuvaLarge from '../public/images/logos/footer_logo_color.png'
import YuvaSingle from '../public/images/logos/footer_logo_color_single.png'
import TDB from '../public/images/logos/tdb.png'

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
          <label style={{gridArea: "links_title"}}>Links</label>
        </div>

        <div className={styles.footer_details}>
          <p>An Initiative By The Students For The Students</p>
          
          <div className={socialStyles.social}>
            <p style={{display: "none"}}>Socials:</p>
          </div>
        </div>

        <div className={styles.footer_copyright}>
          <div><span className={styles.copyright}>&copy;</span> Yuvabharathi Public School {date}</div>
          
          <div className={styles.separator}></div>
          
          <div><a role="link" className={styles.TDB} href="https://sites.google.com/view/team-de-bug"><Image src={TDB} alt="team debug logo" width={24} height={24} /></a>Website by Team De-Bug: Marudhu Paandian K., Rishi Menon and Shabesa K. A.</div>
        </div>
      </footer>
    )
}

export default Footer