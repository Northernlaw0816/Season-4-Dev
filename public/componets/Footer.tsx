import type { ComponentType } from "react";
import Image from 'next/image'
import Link from 'next/link'
import styles from "../../styles/Footer.module.scss";

const Footer: ComponentType = () => {
    return(
        <footer className={styles.footer}>
        <a className={styles.footer_school} href="https://yuvabharathi.in">
          <div className={`${styles.footer_school} ${styles.large}`}>
            <Image src="/images/footer_logo.png" alt="school logo" width="315" height="90"/>
          </div>
          <div className={`${styles.footer_school} ${styles.single}`}>
            <Image src="/images/footer_logo_single.png" alt="school logo" width="63" height="77"/>
          </div>
        </a>
        <div className={styles.footer_content}>
          <h3 style={{gridArea: "event"}}>Events</h3>
          <div className={styles.footer_links} style={{gridArea: "event_links"}}>
            <a href="#">Arena of Valor</a>
            <a href="#">Knock Out</a>
            <a href="#">Truth or Debug</a>
            <a href="#">Log and Blog</a>
            <a href="#">Designscape</a>
            <a href="#">Otakuiz</a>
          </div>
          <h3 style={{gridArea: "links_title"}}>Links</h3>
          <div className={styles.footer_links} style={{gridArea: "links_links"}}>
            <a href="#">Gallery</a>
            <a href="#">Details</a>
            <a href="#">Register Here</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className={styles.footer_details}>
          <p>Arranged by 11th Grade</p>
          <p>Mail: <a href="mailto:nutopia@gmail.com">nutopia@gmail.com</a></p>
          <p></p>
        </div>
        <div className={styles.footer_copyright}>
          Copyright Yuvabharathi Public School 2021 | Template by Team De-Bug <Image src="/images/tbd.png" alt="team debug logo" width="24px" height="24px" />
        </div>
      </footer>
    )
}

export default Footer