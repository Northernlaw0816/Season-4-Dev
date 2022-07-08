//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import OTK from '../../../public/images/events/otk_logo.png'

const Otakuiz = {
    title: "Otakuiz",

    tagline: "Give up on your dreams and make it a reality",
    
    link: '/events/otakuiz',
    
    details: {
        shortDescription: "Welcome to Otakuiz, the ultimate competition to crown the true, most worthy team of the title “Super Sannin”. It’s finally your time to prove that all those hours spent watching anime are not in vain by showing off the knowledge you’ve gained in the ultimate anime quiz. Are you ready to give Otakuiz a shot? Meet fellow weebs and have the time of your life? So join us for the ride and let’s have a blast together.",
        date: [`${Main.dates.day1} -> 10:40 a.m. - 3:00 p.m.`,
            `${Main.dates.day2} -> 10:30 a.m. - 2:30 p.m.`],
        dateAndTime: `${Main.dates.day1}, 10:40 a.m. - 3:00 p.m. | ${Main.dates.day2}, 10:30 a.m. - 2:30 p.m`,
        time: "10:40 a.m. - 3:00 p.m.",
        venue: 'Auditorium',
        grades: '9 - 12',
        image: OTK,
        accent: "hsl(257, 100%, 6%)",
    },
    
    headings: {
        finalists: [
           
        ],

        about: "Welcome to Otakuiz, the ultimate competition to crown the true, most worthy team of the title “Super Sannin”. It’s finally your time to prove that all those hours spent watching anime are not in vain by showing off the knowledge you’ve gained in the ultimate anime quiz. Are you ready to give Otakuiz a shot? Meet fellow weebs and have the time of your life? So join us for the ride and let’s have a blast together.",
            
        rules: [
            "The competitors will participate in groups of 3 and will each come up with a name for your team.",
            "No use of the internet or any gadgets will be allowed.",
            "Participants will be allowed to confer within their own teams to answer questions as there will be no individual participation rounds. However, they may not confer with any other groups in the middle of any rounds."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Otakuiz"),

        registration: [
            "This is a Trio (3 member) event."
        ]
    }
}

export default Otakuiz;