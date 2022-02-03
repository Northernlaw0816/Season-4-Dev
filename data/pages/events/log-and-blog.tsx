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
        venue: 'To Be Announced',
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
            "Open for Grades 9 to 12",
            "Solo Event",
            "The participants are free to access the internet for resources and information",
            "and will be given a time period of 2 hours to complete their blog in ‘WordPress’ or ‘Blogger’ ",
            "Each participant will be given a computer and a variety of topics will be available to choose from"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default LogAndBlog;