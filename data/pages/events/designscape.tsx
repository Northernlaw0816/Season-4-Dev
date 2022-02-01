//data
import { EventCoordinators } from "../../EventCoordinators";
//assets
import DS from '../../../public/images/events/ds_logo.png'

const Designscape = {
    tagline: "Spell a visual magic!",

    link: '/events/designscape',

    details: {
        shortDescription: "A moment is beautiful by itself, but what if it could be better? What if the fate of a raw photo is in your hands? What if the image in your head surpasses the beauty of a shot?  Create a potpourri of your imagination and reality.",
        date: 'To Be Announced',
        time: '1:00 PM to 3:00 Am',
        venue: 'To Be Announced',
        grades: '9 - 12',
        image: DS,
        accent: 'hsl(259, 67%, 25%)',
    },
    
    headings: {
        about: "A moment is beautiful by itself, but what if it could be better? What if the image in your head surpasses the beauty of nature? What if the fate of a raw photo is in your hands? The Designscape event is the perfect opportunity to use your unique magic on a photo and see what comes of it. It's the perfect place to fuse your imagination and reality. So what are you waiting for? Join this event and test your abilities!",
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Designscape"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default Designscape;