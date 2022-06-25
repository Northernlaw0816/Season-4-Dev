//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import OTK from '../../../public/images/events/otk_logo.png'

const Otakuiz = {
    title: "Otakuiz",

    tagline: "You don’t stand a single chance to win unless you fight!",
    
    link: '/events/otakuiz',
    
    details: {
        shortDescription: "Aesthetically pleasing scenes, powerful dialogues and stellar battles, anime has always been a world charged with energy and emotion. For all the seasoned Otakus out there, this is an event that will test your knowledge in anime every step of the way. Prepare to battle it out in Otakuiz! Otakuiz is a duo event where participants have to put their anime knowledge to test in a series of mind-challenging and fun rounds.",
        date: "TBA",
        time: 'TBA',
        venue: 'TBA',
        grades: '9 - 12',
        image: OTK,
        accent: "hsl(257, 100%, 6%)",
    },
    
    headings: {
        finalists: [
           
        ],

        about: "Aesthetically pleasing scenes, powerful dialogues and stellar battles, anime has always been a world charged with energy and emotion. For all the seasoned Otakus out there, this is an event that will test your knowledge in anime every step of the way. Prepare to battle it out in Otakuiz! Otakuiz is a duo event where participants have to put their anime knowledge to test in a series of mind-challenging and fun rounds.",
            
        rules: [
            "The competitors will participate in groups of 2",
            "No use of the internet or any gadgets will be allowed.",
            "Participants will be allowed to confer within their own teams to answer questions as there will be no individual participation rounds.  However, they may not confer with any other groups in the middle of any rounds."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Otakuiz"),

        registration: [
            "This is a Duo (2 member) event."
        ]
    }
}

export default Otakuiz;