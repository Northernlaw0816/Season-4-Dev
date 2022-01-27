import { EventCoordinators } from "../../EventCoordinators";

const LogAndBlog = {
    tagline: "Curate and Create!",
    
    headings: {
        about: "You switch off your laptop and traipse to the kitchen to make yourself coffee. Your fingers grip the lid of the box, you open it with ease and bring it close to your nose. The smell of fresh coffee grounds wafts through the air and you take in as much as possible.Your hands freeze. You are no longer able to put the box down.The back of your neck hurts and you feel the chip pulsing. Can microchips control us? Is future-tech scary? Log and Blog is an event which lets you ponder upon topics such as these. Join this and find answers for a lot of questions.",
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default LogAndBlog;