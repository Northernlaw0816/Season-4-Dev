//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import DS from '../../../public/images/events/ds_logo.png'

const Designscape = {
    id: "designscape",
    title: "Designscape",

    tagline: "All the magic starts from you",
 
    link: '/events/designscape',

    details: {
        shortDescription: "When you see something and you want to remould it to your taste, then your heart knows “I am a designer”. Designscape is a design and photo editing competition, your stage to showcase your creativity. This is a competition where you use your imagination to create an original piece from what you are given. This is your chance to explore, design and create. Show your talent and let the creativity flow.",
        date: `${Main.dates.day2}`,
        dateAndTime: `${Main.dates.day2}, 9:30 a.m. - 2:30 p.m.`,
        time: '9:00 a.m. - 2:30 p.m.',
        venue: 'Mass Media Lab (Main Block)',
        grades: '9 - 12',
        image: DS,
        accent: 'hsl(259, 67%, 25%)',
    },

    headings: {
        about: "When you see something and you want to remould it to your taste, then your heart knows “I am a designer”. Designscape is a design and photo editing competition, your stage to showcase your creativity. This is a competition where you use your imagination to create an original piece from what you are given. This is your chance to explore, design and create. Show your talent and let the creativity flow.",

        rules: [
            "Participants are allowed to use editing softwares of their choice (such as Adobe Photoshop, Snapseed, Blender, Autodesk Maya, Affinity Designer, Procreate, PicsArt, Photoshop Express, Adobe Illustrator, Cinema 4D, Houdini) for completing their designs. (No Canva)",            
            "Participants are supposed to bring their own gadgets for designing.",
            "Participants will be given a maximum of two hours to work with (including the time for choosing the resources).",
            "There will be two rounds conducted, with the first round being an elimination round",
            "Participants are supposed to work with the base image that is provided and if they don’t, they will be disqualified immediately.",
            "The usage of AI image generators or any software of that sort will result in an immediate disqualification.",
            "Students will have to submit the artwork through email as a .png file, failing which they will be disqualified.",
            "Participants should be able to explain their own designs.",
        ],

        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Designscape"),

        registration: [
            "This is an individual event."
        ]
    }
}

export default Designscape;