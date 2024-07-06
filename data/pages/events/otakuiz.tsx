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
        date: [`${Main.dates.day1}, 10:30 a.m. - 3:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 2:30 p.m.`],
        dateAndTime: `${Main.dates.day1}, 10:30 a.m. - 3:00 p.m. | ${Main.dates.day2}, 9:30 a.m. - 1:30 p.m`,
        time: "10:30 a.m. - 3:00 p.m.",
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
            "Participants can take part in groups of 2-3 members, each with distinct team names.",
            "The use of any gadgets or the internet is strictly prohibited to respect fair play.",
            "Participants are only allowed to converse within their teams. They should not confer with any other groups in the middle of any rounds.            ",
            ["The event consists of a preliminary round followed by 2 main rounds, namely :", "Semi Finals (Jeopardy)" ,"Finals (Buzzer Round)"],
            "The preliminaries will not include any negative marking and contestants who cleared the preliminaries will move to the advancing rounds.",
            "If any of the questions in the main rounds are answered incorrectly or left unanswered by a team, the question will be passed onto the next. If there are no correct answers, the question will be skipped.",
            "Upon any unfair means committed, which include shouting out the answers, the team will be warned and then disqualified.",
            "No summoning of Mahoraga - Let him rest. Though the requirement to summon is highly understood :)"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Otakuiz"),

        registration: [
            "Participants register duo or trio teams",
            "Anime themed team names are encouraged. The team with the BEST name will receive a special prize.",
        ]
    }
}

export default Otakuiz;
