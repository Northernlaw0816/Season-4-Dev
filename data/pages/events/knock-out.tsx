//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import KO from '../../../public/images/events/ko_logo.png'

const KnockOut = {
    title: "Knock Out!",

    tagline: "There Are No Tough Opponents, Only Tough Issues.",

    link: '/events/knock-out',

    details: {
        shortDescription: "Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        date: `${Main.dates.day1} - ${Main.dates.day2}`,
        time: '8:30 AM to 9:30 AM',
        venue: 'To Be Announced',
        grades: '9 - 12',
        image: KO,
        accent: 'black',
    },
    
    headings: {
        about: "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        
        rules: [
            "Solo Event for Grades 9 to 12"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Knock Out"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default KnockOut;