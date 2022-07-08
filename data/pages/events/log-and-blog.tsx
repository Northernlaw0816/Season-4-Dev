//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import LAB from '../../../public/images/events/lab_logo_2.png'

const LogAndBlog = {
    title: "Log and Blog",

    tagline: "Curate and Create!",

    link: '/events/log-and-blog',

    details: {
        shortDescription: "Can human beings and robots coexist? Can harmony be found in such a scenario?Log and Blog is an event which lets you unleash your creative writing skills. Log in, research, review and pen your refreshing thoughts.",
        date: `${Main.dates.day1}`,
        dateAndTime: `${Main.dates.day1} -> 10:40 a.m. - 2:00  p.m.`,
        time: '10:40 a.m. - 2:00  p.m.',
        venue: 'Computer Lab (Primary Block)',
        grades: '9 - 12',
        image: LAB,
        accent: 'hsl(243, 32%, 11%)',  
    },
    
    headings: {
        about: "Can human beings and robots coexist? Can harmony be found in such a scenario? Log and Blog is an event which lets you unleash your creative writing skills. Log in, research, review and pen your refreshing thoughts.",

        
        rules: [
            "Solo event for Grades 9 to 12.",
            "Participants are free to access the internet for resources and information.",
            "However, any kind of plagiarism will strictly be dealt with.",
            "Participants are given a time period of 2 hours to complete their blog in 'Blogger'.",
            "Each participant will be given a computer, hence they do not have to bring their own gadgets.",
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default LogAndBlog;