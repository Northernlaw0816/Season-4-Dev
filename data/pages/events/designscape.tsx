//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import DS from '../../../public/images/events/ds_logo.png'

const Designscape = {
    title: "Designscape",

    tagline: "Spell a visual magic!",

    link: '/events/designscape',

    details: {
        shortDescription: "A moment is beautiful by itself, but what if it could be better? What if the fate of a raw photo is in your hands? What if the image in your head surpasses the beauty of a shot?  Create a potpourri of your imagination and reality.",
        date: Main.dates.day1,
        time: '1:00 PM to 3:00 PM',
        venue: 'Yoga Hall',
        grades: '9 - 12',
        image: DS,
        accent: 'hsl(259, 67%, 25%)',
    },
    
    headings: {
        about: "A moment is beautiful by itself, but what if it could be better? What if the image in your head surpasses the beauty of nature? What if the fate of a raw photo is in your hands? The Designscape event is the perfect opportunity to use your unique magic on a photo and see what comes of it. It's the perfect place to fuse your imagination and reality. So what are you waiting for? Join this event and test your abilities!",
        
        rules: [
            "Solo Event for Grades 9 to 12",
            "Three topics or themes would be given to the participants. They could choose one.",
            "The participant will work on the topic and come up with a design of their own",
            "The participants are to bring their own devices and are free to use any of the suggested apps/softwares: Adobe Photoshop, Adobe Lightroom, Canva, Adobe Photoshop Elements, Snapseed, PicsArt, Photoshop Express.",
            "A time limit of 2 hours will be given to the participants to submit their creatives."
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Designscape"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default Designscape;