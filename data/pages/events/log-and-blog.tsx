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
        date: Main.dates.day2,
        time: 'TBA',
        venue: 'Primary & Secondary Computer Lab',
        grades: '9 - 12',
        image: LAB,
        accent: 'hsl(243, 32%, 11%)',  
    },
    
    headings: {
        about: <>
            <i>
                <p>
                    “You switch off your laptop and traipse to the kitchen to make yourself coffee.
                    Your fingers grip the lid of the box; you open it with ease and bring it close to your nose.
                    The smell of fresh coffee grounds wafts through the air and you take in as much as possible.
                    Your hands freeze. You are no longer able to put the box down. The back of your neck hurts and you feel the chip pulsing…”
                </p>
            </i>
            <p>
                Can microchips control us? Is future-tech scary?
                Log and Blog is an event which lets you unleash your creative writing skills.
                Log in, research, review and pen your refreshing thoughts
            </p>
        </>,
        
        rules: [
            "Solo event for Grades 9 to 12",
            "Participants are free to access the internet for resources and information",
            "However, any kind of plagiarism will strictly be dealt with.",
            "Participants are given a time period of 2 hours to complete their blog in 'Blogger'.",
            "Each participant will be given a computer, hence they do not have to bring their own gadgets",
            "School will not be responsible for any damages to the provided computer."
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