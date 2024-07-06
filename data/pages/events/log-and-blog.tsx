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
        about: "Ignite your inner writer! Log and Blog is an event which lets you unleash your creative writing skills. Log in, research, review and pen your refreshing thoughts.",

        
        rules: [
            "Blogs will be evaluated based on originality, credibility, relevance and adherence of the guideline.",
            "Participants will be given a time of 2.5 hours to complete their blogs. In the given time participants are to research and write out their blogs simultaneously. There is no separate time for research.",
            "Each participant will be given a computer, hence they do not have to bring their own gadgets.",
            "Blogs may include humor provided that the overall tone maintains a formal.",
            "Participants are advised to maintain a consistent stance throughout the blog on the given topic.",
            "Participants may include images, graphs and other media provided they’re credible and accurate.",
            "Any form of cheating such as the usage of generative AI, plagiarism, partnership and irrelevant use of the internet will result in immediate disqualification",
            "Topics once assigned cannot be changed since topics given are completely randomized. Participants must refrain from exceeding the time limit.",
            "There will be two rounds conducted",
            ["Round 1:","Participants will receive a general topic related to STEM and must write a blog about it"],
            ["Round 2:","Participants will be given statements by famous tech-personalities and would have to strictly oppose the given statement and provide credible arguments against the statement."]
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
