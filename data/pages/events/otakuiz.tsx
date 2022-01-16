import { EventCoordinators } from "../../EventCoordinators";

const Otakuiz = {
    tagline: "You don’t stand a single chance to win unless you fight!",
    
    headings: {
        about: "Aesthetically pleasing scenes, powerful dialogues and stellar battles, anime has always been a world charged with energy and emotion. For all the seasoned anime watchers out there, this is the perfect opportunity for you. Prepare to battle it out in Otakuiz! An event that will test your knowledge in anime every step of the way. Do you have what it takes? In the clever words of Mikasa Ackerman, \“You don’t stand a single chance to win unless you fight\”.",
            
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Otakuiz"),

        registration: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?"
    }
}

export default Otakuiz;