import Image from 'next/image'
import Link from 'next/link'
import styles from "../../styles/Footer.module.scss"

const Footer = () => {
    return(
        <footer className={styles.footer}>
        <a className={styles.footer_school} href="https://yuvabharathi.in">
          <div className={styles.large}>
            <Image src="/images/footer_logo.png" alt="school logo" width="315" height="90"/>
          </div>
          <div className={styles.single}>
            <Image src="/images/footer_logo_single.png" alt="school logo" width="63" height="77"/>
          </div>
        </a>
        <div className={styles.footer_content}>
          <h3 style={{gridArea: "event"}}>Events</h3>
          <div className={styles.footer_links} style={{gridArea: "event_links"}}>
            <Link href="/events/arena-of-valor"><a>Arena of Valor</a></Link>
            <Link href="/"><a>Knock Out</a></Link>
            <Link href="/"><a>Truth or Debug</a></Link>
            <Link href="/"><a>Log and Blog</a></Link>
            <Link href="/"><a>Designscape</a></Link>
            <Link href="/"><a>Otakuiz</a></Link>
          </div>
          <h3 style={{gridArea: "links_title"}}>Links</h3>
          <div className={styles.footer_links} style={{gridArea: "links_links"}}>
            <Link href="/"><a>Gallery</a></Link>
            <Link href="/"><a>Details</a></Link>
            <Link href="/"><a>Register Here</a></Link>
            <Link href="/"><a>About</a></Link>
            <Link href="/"><a>Contact</a></Link>
          </div>
        </div>
        <div className={styles.footer_details}>
          <p>Arranged by 11th Grade</p>
          <p>E-Mail: <a href="mailto:nutopia.ybps@gmail.com">nutopia@gmail.com</a></p>
        </div>
        <div className={styles.footer_copyright}>
          <div><div className={styles.copyright}>©</div> Yuvabharathi Public School 2021</div>
          <div>|</div>
          <div><a href="https://github.com/Team-De-Bug"><Image src="/images/tbd.png" alt="team debug logo" width="24px" height="24px" /></a> Template by Team De-Bug</div>
        </div>
      </footer>
    )
}

export default Footer