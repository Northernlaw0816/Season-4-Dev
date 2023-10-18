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
        dateAndTime: `${Main.dates.day1}, 10:30 a.m. - 2:00  p.m.`,
        time: '10:30 a.m. - 3:00  p.m.',
        venue: 'Computer Lab (Secondary Block)',
        grades: '9 - 12',
        image: LAB,
        accent: 'hsl(243, 32%, 11%)',  
    },
    
    headings: {
        about: "Can human beings and robots coexist? Can harmony be found in such a scenario? Log and Blog is an event which lets you unleash your creative writing skills. Log in, research, review and pen your refreshing thoughts.",

        
        rules: [
            "Solo event for Grades 9 to 12.",
            "Participants are given a time period of four hours to complete their blog in “Blogger”.",
            "Each participant will be given a computer, hence they do not have to bring their own gadgets.",
            "Participants are free to access the internet for resources and information pertaining to their given topic",
            "However, it is strictly frowned upon for participants to log into their personal accounts in google or otherwise",
            "Plagiarism of any kind merits the removal of the participant from the event.",
            "Usage of the internet for any purpose that does not resonate with their research will be strictly dealt with.",
            "The use of apps or supplements like ChatGPT, QuillBot and ChatMaster is strictly forbidden.",
            "Participants are advised against depending on Wikipedia for quality information.",

        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event - 6 participants per school"
        ]
    }
}

export default LogAndBlog;
