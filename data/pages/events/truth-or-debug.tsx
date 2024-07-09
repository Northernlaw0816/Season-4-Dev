
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

    tagline: "Quiz ON",
    link: '/events/truth-or-debug',

    details: {
        shortDescription: "",
        dateAndTime: [
            `${Main.dates.day1}, 10:00 p.m. - 3:00 p.m.`,
        ],
        venue: 'AV Lab',
        grades: '9 - 12',
        image: TD,
        accent: "black",
    },

    headings: {
        finalists: [
            
        ],

        about: "Do you think you can participate in the battle royale of coding and circuit making? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Truth or Debug.",
        
        rules: [
            "The quiz is entirely themed around STEM (Science, Tech, Engineering, Math).",
            "The participants are to enroll themselves in pairs, with appropriate team names.",
            "Use of the internet and electronic gadgets is strictly prohibited.",
            "No cross-talk will be entertained.",
            "Participants carry only the necessary stationary;  papers will be provided.",
            "The Quiz master's decisions shall be final",
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),
        /*prerequisites:[
            "Intermediate knowledge of at least one of the prescribed programming languages is required.",
            "Basic knowledge of circuit making."
        ],*/    
        registration: [
            "Participants register in teams of two."
        ]
    }
}

export default TruthOrDebug;
