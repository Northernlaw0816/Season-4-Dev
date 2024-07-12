
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

    tagline: "Unleash Your Inner Genius!",
    link: '/events/truth-or-debug',

    details: {
        shortDescription: "It's time to ignite your curiosity and showcase your mastery of science, technology, engineering, and math! Truth or Debug is a thrilling competition that will put your problem-solving skills to the test. Join us on a journey through the realms of innovation, discovery, and critical thinking. Will you emerge as the ultimate STEM champion?.",
        dateAndTime: [
            `${Main.dates.day1}, 10:00 a.m. - 3:00 p.m.`,
        ],
        venue: 'AV Lab',
        grades: '9 - 12',
        image: TD,
        accent: "black",
    },

    headings: {
        finalists: [
            
        ],

        about: "It's time to ignite your curiosity and showcase your mastery of science, technology, engineering, and math! Truth or Debug is a thrilling competition that will put your problem-solving skills to the test. Join us on a journey through the realms of innovation, discovery, and critical thinking. Will you emerge as the ultimate STEM champion?.",
        
        rules: [
            "The quiz is entirely themed around STEM (Science, Tech, Engineering, Math).",
            "The participants are to enroll themselves in pairs, with appropriate team names.",
            "Use of the internet and electronic gadgets is strictly prohibited.",
            "No cross-talk will be entertained.",
            "Participants carry only the necessary stationary;  papers will be provided.",
            "The Quiz master's decisions shall be final.",
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
