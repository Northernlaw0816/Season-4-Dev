//stylesheets
import styles from '../../../styles/pages/Events.module.scss';
//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import KO from '../../../public/images/events/ko_logo.png'

const KnockOut = {
    title: "Knock Out!",

    tagline: <>There Are No Tough <span className={styles.blue}>Opponents</span>, Only Tough <span className={styles.red}>Issues</span>.</>,

    link: '/events/knock-out',

    teamsRound1Download: "https://drive.google.com/u/0/uc?id=1iq2TssEw8ycWIQP0QrrNbKJAqyUoCXpn&export=download",
    teamsRound1Embed: "https://drive.google.com/file/d/1iq2TssEw8ycWIQP0QrrNbKJAqyUoCXpn/preview",

    backgroundGuideDownload: "https://drive.google.com/u/0/uc?id=1-rabcwDUJ0WN8RdAPjDli7_Ern3o8oFK&export=download",
    backgroundGuideEmbed: "https://drive.google.com/file/d/1-rabcwDUJ0WN8RdAPjDli7_Ern3o8oFK/preview",

    details: {
        shortDescription: "Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        date: `${Main.dates.day1} - ${Main.dates.day2}`,
        time: '8:30 AM to 9:30 AM',
        venue: 'Conference Room',
        grades: '9 - 12',
        image: KO,
        accent: 'black',
    },
    
    headings: {
        about: "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        
        guidelines: [
            {
                title: "Preliminary Round",
                rules: [
                    "All participants will be divided into 2 teams (For / Against the given topic by the organisers), beforehand. They will be added to a respective Whatsapp group.",
                    "Participants are expected to have basic knowledge of the topic and may go through the background guide for the debate which will be released soon.",
                    "Participants at once will be allowed to make an argument for his/her stance and the opposition will have rebuttals. This cycle would continue. ",
                    "Participants will be notified once at 25 seconds and then at 30 seconds so as to conclude their point.",
                    "If a participant continues to speak even after they are asked to stop by the moderators, they will be negatively marked.",
                    "Repetition of points is not allowed.",
                    "This round is based on arguments and rebuttals, NO SPEECHES. ",
                    "Participants will be allowed to make points or rebut more than once."
                ]
            },

            {
                title: "Final Round",
                rules: [
                    "Only 10 participants will be selected for the finals",
                    "They will be divided into 5 pairs",
                    "Each pair will be given a debate topic and each participant a \"For\" or \"Against\" stance",
                    "A one-on-one formal debate will be held for each pair wherein each participant has to make a speech of 2 to 3 minutes.",
                    "Each participant will be allowed to ask 1 question and 1 follow up question to their respective partners ",
                    "The topics and the finalists list will be released on Feb 8 2022",
                    "From the 10 finalists 1 winner and 1 runner up will be awarded.",
                    "Finals will be held on the following day (Feb 9) and topics will be announced by 8th Feb itself"
                ]
            }
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Knock Out"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default KnockOut;