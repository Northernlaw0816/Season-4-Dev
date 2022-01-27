import { EventCoordinators } from "../../EventCoordinators";

const KnockOut = {
    tagline: "No tough opponents, only tough issues.",
    
    headings: {
        about: "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Knock Out"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default KnockOut;