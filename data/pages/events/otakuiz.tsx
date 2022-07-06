//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import OTK from '../../../public/images/events/otk_logo.png'

const Otakuiz = {
    title: "Otakuiz",

    tagline: "You don't stand a single chance to win unless you fight!",
    
    link: '/events/otakuiz',
    
    details: {
        shortDescription: "Welcome to Otakuiz, the ultimate competition to crown the true, most worthy team of the title It's time to put all the hours spent watching anime in front of your screen for off-screen use! Yuva Nu Topia provides all the weebs in our school an opportunity to shine and show off their anime knowledge! Are you ready to give a shot at otakuiz, meet fellow weebs and have the time of your life?",
        date: `${Main.dates.day1}`,
        time: "10:40 a.m. - 3:00 p.m.",
        venue: 'Auditorium',
        grades: '9 - 12',
        image: OTK,
        accent: "hsl(257, 100%, 6%)",
    },
    
    headings: {
        finalists: [
           
        ],

        about: "Welcome to Otakuiz, the ultimate competition to crown the true, most worthy team of the title It's time to put all the hours spent watching anime in front of your screen for off-screen use! Yuva Nu Topia provides all the weebs in our school an opportunity to shine and show off their anime knowledge! Are you ready to give a shot at otakuiz, meet fellow weebs and have the time of your life?",
            
        rules: [
            "The competitors will participate in groups of 3 and will each come up with a name for their group and a buzzer phrase for the buzzer round.",
            "No use of the internet or any gadgets will be allowed.",
            "Participants will be allowed to confer within their own teams to answer questions as there will be no individual participation rounds.  However, they may not confer with any other groups in the middle of any rounds.",
            "Attempt to answer before completion of the question or out of turn leads to deduction of points."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Otakuiz"),

        registration: [
            "This is a Trio (3 member) event."
        ]
    }
}

export default Otakuiz;