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
        shortDescription: "Can microchips control us? Is future-tech scary? Log and Blog is an event which lets you unleash your creative writing skills. Log in, research, review and pen your refreshing thoughts...",
        date: Main.dates.day2,
        time: '1:00 PM to 3:00 PM',
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
            "Solo Event for Grades 9 to 12.",
            "Upto 4 images are allowed in the document.",
            "Use times new roman, size 12 font with 1.5 spacing.",
            "Black font with no highlighting/bold/italics in the body of the paragraph.",
            "There will be a plagiarism check. A percentage of 30 or beyond will subject document to disqualification.",
            "Documents submitted after the allotted timelimit  will result in disqualification.",
            "Information from wikipedia and/or other sources cannot be included in the blog entry."
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Acccuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default LogAndBlog;