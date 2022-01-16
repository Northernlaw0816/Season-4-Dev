import { EventCoordinators } from "../../EventCoordinators";

const Designscape = {
    tagline: "Grab The Clutch And Feel The Power",
    
    headings: {
        about: "A moment is beautiful by itself, but what if it could be better? What if the image in your head surpasses the beauty of nature? What if the fate of a raw photo is in your hands? The Designscape event is the perfect opportunity to use your unique magic on a photo and see what comes of it. It's the perfect place to fuse your imagination and reality. So what are you waiting for? Join this event and test your abilities!",
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Designscape"),

        registration: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?"
    }
}

export default Designscape;