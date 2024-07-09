
//stylesheets
import styles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import PS from '../../../public/images/events/ps_background2.png'

const Pitstop = {
    id: "pitstop",
    title: "Pitstop",

    tagline: (<><span className={styles.yellow}>It's Lightsout! </span><span className={styles.red}>And Away We GO!</span></>),
    
    link: '/events/pitstop',

    details: {
        shortDescription: "Pitstop, is the ultimate RC car building and racing extravaganza! An event where STEM meets RACING. Participants will design, build, and race their remote-controlled cars, pushing the limits of speed and performance.",
        dateAndTime: [
            `${Main.dates.day1}, 10:15 p.m. - 3:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 1:30 p.m.`
        ],
        venue: 'Primary Block Center',
        grades: '9 - 12',
        image: PS,
        accent: "#febf01",
    },

    headings: {
        finalists: [
            
        ],

        about: "Pitstop is the ultimate RC car building and racing extravaganza! An event where STEM meets RACING. Participants will design, build, and race their remote-controlled cars, pushing the limits of speed and performance.",
        
        rules: [
            "Each team must comprise 3-4 participants.",
            "Teams with RC cars bought or made by a third party will be disqualified.",
            "The RC has to be built before the event. (Note:- no time will be provided before or during the event for the build.)",
            "Any kind of fuel engines will not be allowed.",
            ["The RC has to comply with the following regulations to be considered eligible for the contest:", "Must fit within the dimensions: 30cm x 30cm x 30cm", "The power supply is restricted to 24v and below.","Max Tyre Width - 50mm","Max Tyre Diameter - 80mm","Max RPM - 2000 to 3000rpm"],
            "The race track, which is on muddy terrain, will only be revealed on the day of the event so students should build accordingly",
            ["Teams will be marked on the following rubrics:", "Build Strength", "Design", "Durability"],
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Pitstop"),

        registration: [
            "Participants register in teams of 3."
        ]
    }
}

export default Pitstop;
