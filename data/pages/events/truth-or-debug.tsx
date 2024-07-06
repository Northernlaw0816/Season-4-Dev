
//stylesheets
import styles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import TD from '../../../public/images/events/td_logo.png'

const TruthOrDebug = {
    id: "truth-or-debug",
    title: "Truth or Debug",

    tagline: (<><span className={styles.grey}>{`print(`}</span>{`"`}I have not failed, I have found 10,000 ways how not to solve a problem{`"`}<span className={styles.grey}>{`);`}</span></>),
    
    link: '/events/truth-or-debug',

    details: {
        shortDescription: "Do you think you can participate in the battle royale of coding and circuit making? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Truth or Debug.",
        dateAndTime: [
            `${Main.dates.day1}, 10:15 p.m. - 3:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 2:00 p.m.`
        ],
        venue: 'ATAL Lab',
        grades: '9 - 12',
        image: TD,
        accent: "black",
    },

    headings: {
        finalists: [
            
        ],

        about: "Do you think you can participate in the battle royale of coding and circuit making? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Truth or Debug.",
        
        rules: [
            "Participants are allowed to only use Python, Java or JavaScript",
            "Participants must know the basics of EV3s",
            "Participants will work using the EV3 classroom app and must have it installed in their devices ",
            "Participants must bring their own devices and accessories",
            "Receiving external help is strictly prohibited.",
            "In case of malpractices, all concerned groups will be held accountable",
            "No more than 3 participants are allowed in a team.",
            "Components required for the circuit rounds will be provided."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),
        prerequisites:[
            "Intermediate knowledge of at least one of the prescribed programming languages is required.",
            "Basic knowledge of circuit making."
        ],
        registration: [
            "Participants register in Duo Teams"
        ]
    }
}

export default TruthOrDebug;
