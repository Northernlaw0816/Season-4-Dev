
//stylesheets
import styles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import TD from '../../../public/images/events/td_logo.png'
import PitStopData from '../../../pages/events/pitstop';

const PitStop = {
    title: "PitStop",

    tagline: (<><span className={styles.grey}>{`Under Construction.exe(`}</span>{`"`}DU DU DU DU MAX VERSTAPPEN{`"`}<span className={styles.grey}>{`);`}</span></>),
    
    link: '/events/pitstop',

    details: {
        shortDescription: "",
        dateAndTime: [
            `${Main.dates.day1}, 10:15 p.m. - 3:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 2:00 p.m.`
        ],
        venue: '',
        grades: '',
        image: TD,
        accent: "",
    },

    headings: {
        finalists: [
            
        ],

        about: "",
        
        rules: [
            "",
            ""
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "PitStop"),
        prerequisites:[ 
            "",
            ""
        ],
        registration: [
            "I don't wanna know"
        ]
    }
}

export default PitStop;
