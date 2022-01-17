//stylesheets
import styles from "../../styles/Socials.module.scss"
//assets
import placeholder from '../../public/images/profile/sidharth.png'
import IG from '../../public/images/logos/ig_logo.png'
import FB from '../../public/images/logos/fb_logo.png'
import YT from '../../public/images/logos/yt_logo.png'
import TBD from '../../public/images/logos/tbd.png'
import LI from '../../public/images/logos/li_logo.png'
import GH from '../../public/images/logos/gh_logo.png'


const ContactUs = {
    contacts: {
        emails: ["info@nutopia.in", "admin@nutopia.in"],
        phone: "+91 82200 59603",
        address: "Yuvabharathi Public School 17/1. Yuva Enclave, Kanuvai - Thudiyalur Road, Somayampalayam Post, Kanuvai, Coimbatore, Tamil Nadu 641108, India"
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
                role: "Lead Developer",
                src: placeholder
            },
            {
                name: "Shabesa K. A.",
                role: "FrontEnd Developer",
                src: placeholder
            },
            {
                name: "Marudhu Paandian K.",
                role: "Advisor",
                src: placeholder
            }
        ],
        socials: [
            {
                name: "Website",
                link: "https://sites.google.com/view/team-de-bug",
                image: TBD,
                style: styles.website
            },
            {
                name: "LinkedIn",
                link: "https://www.linkedin.com/company/79782691",
                image: LI,
                style: styles.linkedin
            },
            {
                name: "GitHub",
                link: "https://www.github.com/Team-De-Bug",
                image: GH,
                style: styles.github
            }
        ]
    }
}

export default ContactUs