
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
        shortDescription: "Is troubleshooting your cup of tea? Do you have razor sharp instinct to spot the error? Join the clan at Truth or Debug! Let your keen eyes dart from one line to the next to spot the anomalies - as hunters do for their prey! Prepare your nimble minds to debug as you race against the pressure of time!",
        date: `${Main.dates.day1} - ${Main.dates.day2}`,
        time: '1:00 p.m. - 4:00 p.m.',
        venue: 'ATAL Lab',
        grades: '9 - 12',
        image: TD,
        accent: "black",
    },

    headings: {
        finalists: [
            
        ],

        about: "Is troubleshooting your cup of tea? Do you have razor sharp instinct to spot the error? Join the clan at Truth or Debug! Let your keen eyes dart from one line to the next to spot the anomalies - as hunters do for their prey! Prepare your nimble minds to debug as you race against the pressure of time!",
        
        rules: [
            "Participants are allowed to use any programming language (provided the output is suitable) prescribed below for the coding rounds: (Java, C, C++, Python, Javascript, or any)",
            "Participants must bring their own devices and accessories (Laptops, tablets).",
            "The participants are allowed only in teams of 3.",
            "Internet use or getting help from other participating teams is strictly prohibited.",
            "Components required for the circuit rounds will be provided."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),
        prerequisites:["Intermediate knowledge of at least one of the prescribed programming languages is required.","Basic knowledge of circuit making."],
        registration: [
            "This is a Duo (2 member) event."
        ]
    }
}

export default TruthOrDebug;