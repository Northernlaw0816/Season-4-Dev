
//stylesheets
import eventStyles from '../../../styles/pages/Events.module.scss'
//data
import Main from '../../Main';
import { EventCoordinators } from '../../EventCoordinators';
//assets
import TD from '../../../public/images/events/td_logo.png'

const TruthOrDebug = {
    title: "Truth or Debug",

    tagline: (<><span className={eventStyles.grey}>{`print(`}</span>{`"`}I have not failed, I have found 10,000 ways how not to solve a problem{`"`}<span className={eventStyles.grey}>{`);`}</span></>),
    
    link: '/events/truth-or-debug',

    details: {
        shortDescription: "Is trouble shooting your cup of tea? Do you have razor sharp instincts to spot the error? Join the clan at the truth or debug!",
        date: `${Main.dates.day1} - ${Main.dates.day2}`,
        time: '9:45 AM to 12:35 PM',
        venue: 'To Be Announced',
        grades: '9 - 12',
        image: TD,
        accent: "black",
    },

    headings: {
        about: "Is trouble shooting your cup of tea? Do you have razor sharp instincts to spot the error? Join the clan at the truth or debug! Let your keen eyes dart from one line to the next to spot the anomalies - as hunters do for their prey! Expect the pressure to build up as your nimble mind debugs!",
        
        rules: [
            "Open for Grades 9 to 12 who have intermediate knowledge in coding and electronics.",
            "Two participants in a team (Duo Event).",
            "Each team will be given a desk of its own.",
            "A bug/random problem will be given on the spot and the first participant to tap their desk with their pen/raise their hand will be given the chance to solve it first."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Truth or Debug"),

        registration: [
            "This is a Duo (2 member) event."
        ]
    }
}

export default TruthOrDebug;