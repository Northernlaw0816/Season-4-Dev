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
            "Blogs will be evaluated based on originality, credibility, relevance and adherence of the guideline.",
            "Participants are given a time period of four hours to complete their blog in “Blogger”.",
            "Each participant will be given a computer, hence they do not have to bring their own gadgets.",
            "Blogs may include humor provided that the overall tone maintains a formal",
            "Participants may include images, graphs and other media provided they’re credible and accurate.",
            "Any form of cheating such as the usage of generative AI, plagiarism, partnership and irrelevant use of the internet will result in immediate disqualification",
            "Topics once assigned cannot be changed since topics given are completely randomized. Participants must refrain from exceeding the time limit.",
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event"
        ]
    }
}

export default LogAndBlog;
