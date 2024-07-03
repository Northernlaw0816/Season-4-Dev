
//stylesheets
import styles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import PS from '../../../public/images/events/ps_background2.png'

const Pitstop = {
    title: "Pitstop",

    tagline: (<><span className={styles.yellow}>Unleash the Dust! </span><span className={styles.red}>Feel the Thrust!</span></>),
    
    link: '/events/pitstop',

    details: {
        shortDescription: "Do you think you can participate in the epic battle of car racing? Can you construct you own RC Motor vehicle that has to run on dirt field with obstacle that we have set for you? If you think you are ready to put your skills to the test, participate in PitStop!",
        dateAndTime: [
            `${Main.dates.day1}, 10:15 p.m. - 3:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 2:00 p.m.`
        ],
        venue: 'Primary Block Center',
        grades: '9 - 12',
        image: PS,
        accent: "#febf01",
    },

    headings: {
        finalists: [
            
        ],

        about: "Do you think you can participate in the epic battle of car racing? Can you construct you own RC Motor vehicle that has to run on dirt field with obstacle that we have set for you? If you think you are ready to put your skills to the test, participate in PitStop!",
        
        rules: [
            "Participants are to create their own RC Motor vechicle",
            "Participants must play fair game",
            "Participants will be disqualified if found in malpractices",
            "Participants must bring their model charged",
            "Using pre-made vechicle is strictly against rules",
            "In case of malpractices, all concerned groups will be held accountable",
            "No more than 3 participants are allowed in a team.",
            "Scores will be displayed live in the field set up."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "PitStop"),
/*
        prerequisites:[
            "Intermediate knowledge of at least one of the prescribed programming languages is required.",
            "Basic knowledge of circuit making."
        ], 
*/
        registration: [
            "Participants register Trio Teams (3 members) - 3 teams per school"
        ]
    }
}

export default Pitstop;
