import Image from 'next/image'
import Link from 'next/link'

//stylesheets
import styles from "../../styles/Footer.module.scss"
import effects from "../../styles/Effects.module.scss"
//assets
import YuvaLarge from '../../public/images/footer_logo_color.png'
import YuvaSingle from '../../public/images/footer_logo_color_single.png'
import TBD from '../../public/images/tbd.png'

const Footer = () => {
    return(
        <footer className={styles.footer}>
        <a role="link" className={styles.footer_school} href="https://yuvabharathi.in">
          <div className={styles.large}>
            <Image src={YuvaLarge} alt="school logo" width="315" height="90"/>
          </div>
          <div className={styles.single}>
            <Image src={YuvaSingle} alt="school logo" width="63" height="77"/>
          </div>
        </a>
        <div className={styles.footer_content}>
          <label style={{gridArea: "event"}}>Events</label>
          <div className={styles.footer_links} style={{gridArea: "event_links"}}>
            <Link href="/events/arena-of-valor"><a role="link" className={effects.link_hover_effect}>Arena of Valor</a></Link>
            <Link href="/events/knock-out"><a role="link" className={effects.link_hover_effect}>Knock Out</a></Link>
            <Link href="/events/truth-or-debug"><a role="link" className={effects.link_hover_effect}>Truth or Debug</a></Link>
            <Link href="/events/log-and-blog"><a role="link" className={effects.link_hover_effect}>Log and Blog</a></Link>
            <Link href="/events/designscape"><a role="link" className={effects.link_hover_effect}>Designscape</a></Link>
            <Link href="/events/otakuiz"><a role="link" className={effects.link_hover_effect}>Otakuiz</a></Link>
          </div>
          <label style={{gridArea: "links_title"}}>Links</label>
          <div className={styles.footer_links} style={{gridArea: "links_links"}}>
            <Link href="/"><a role="link" className={effects.link_hover_effect}>About</a></Link>
            <Link href="/"><a role="link" className={effects.link_hover_effect}>Registeration</a></Link>
            <Link href="/"><a role="link" className={effects.link_hover_effect}>Gallery</a></Link>
            <Link href="/"><a role="link" className={effects.link_hover_effect}>Contact</a></Link>
          </div>
        </div>
        <div className={styles.footer_details}>
          <p>An Initiative By The Students For The Students</p>
          <p>E-Mail: <a role="link" href="mailto:nutopia.ybps@gmail.com">nutopia.ybps@gmail.com</a></p>
        </div>
        <div className={styles.footer_copyright}>
          <div><div className={styles.copyright}>©</div> Yuvabharathi Public School 2021</div>
          <div className={styles.separator}></div>
          <div><a role="link" className={styles.TDB} href="https://sites.google.com/view/team-de-bug"><Image src={TBD} alt="team debug logo" width="24px" height="24px" /></a> Template by Team De-Bug</div>
        </div>
      </footer>
    )
}

export default Footer