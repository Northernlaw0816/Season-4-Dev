
//stylesheets
import styles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import TD from '../../../public/images/events/td_logo.png'

const TruthOrDebug = {
    title: "Truth or Debug",

    tagline: (<><span className={styles.grey}>{`print(`}</span>{`"`}I have not failed, I have found 10,000 ways how not to solve a problem{`"`}<span className={styles.grey}>{`);`}</span></>),
    
    link: '/events/truth-or-debug',

    details: {
        shortDescription: "Do you think you can participate in the battle royale of coding and circuit making? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Truth or Debug.",
        date: [
            `${Main.dates.day1}, 1:00 p.m. - 4:00 p.m.`,
            `${Main.dates.day2}, 1:00 a.m. - 4:00 p.m.`
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
            "Participants are allowed to use any programming language (provided the output is suitable).",
            "Participants must bring their own devices and accessories (Laptops, tablets).",
            "The participants are allowed only in teams of 3.",
            "Internet use or getting help from other participating teams is strictly prohibited.",
            "Components required for the circuit rounds will be provided."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),
        prerequisites:["Intermediate knowledge of at least one of the prescribed programming languages is required.","Basic knowledge of circuit making."],
        registration: [
            "This is a Trio event - 2 teams per school"
        ]
    }
}

export default TruthOrDebug;