//stylesheets
import styles from "../../styles/components/Socials.module.scss"
//assets
import rishi from '../../public/images/profile/rishi.png'
import shabesa from '../../public/images/profile/shabesa.png'
import marudhu from '../../public/images/profile/marudhu.png'
import rajaneesh from '../../public/images/profile/rajaneesh.png'
import jeyasingh from '../../public/images/profile/jeyasingh.png'

import IG from '../../public/images/logos/ig_logo.png'
import FB from '../../public/images/logos/fb_logo.png'
import YT from '../../public/images/logos/yt_logo.png'
import TDB from '../../public/images/logos/tdb.png'
import LI from '../../public/images/logos/li_logo.png'
import GH from '../../public/images/logos/gh_logo.png'


const ContactUs = {
    contacts: {
        emails: ["info@nutopia.in", "admin@nutopia.in"],
        phone: "+91 82200 59603",
        address: <>Yuvabharathi Public School,<br/> 17/1, Yuva Enclave, Kanuvai - Thudiyalur Road,<br/> Somayampalayam Post, Kanuvai,<br/> Coimbatore, Tamil Nadu 641108, India</>
    },

    socials: [
        {
            name: "Instagram",
            link: "https://www.instagram.com/nutopia_ybps/",
            image: IG,
            style: styles.insta
        },
        {
            name: "Facebook",
            link: "https://www.facebook.com/NuTopia-106903048559461/?ref=page_internal",
            image: FB,
            style: styles.facebook
        },
        {
            name: "YouTube",
            link: "https://www.youtube.com/channel/UC6gMtIVvbPDfVsR4e1Knx9A",
            image: YT,
            style: styles.youtube
        }
    ],

    teamDeBug : {
        mail: "team.debug.2004@gmail.com",
        profiles: [
            {
                name: "Rishi Menon",
                roles: ["Lead Developer"],
                src: rishi
            },
            {
                name: "Shabesa K. A.",
                roles: ["Front-End Developer", "Audio Director"],
                src: shabesa
            },
            {
                name: "Rajaneesh R.",
                roles: ["Back-End Developer"],
                src: rajaneesh
            },
            {
                name: "Marudhu Paandian K.",
                roles: ["Back-End Developer"],
                src: marudhu
            },
            {
                name: "Mr. Anand Jeyasingh",
                roles: ["Mentor"],
                src: jeyasingh
            }
        ],
        socials: [
            {
                name: "Website",
                link: "https://sites.google.com/view/team-de-bug",
                image: TDB,
                style: styles.website
            }
        ]
    }
}

export default ContactUs