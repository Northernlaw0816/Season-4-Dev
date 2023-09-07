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
        shortDescription: "In this arena, you are the one who holds all powers- the fate of the bright colours and the design as a whole lie in your hands.Turn your wild imaginations into virtual reality. Grab your chance to nurture creativity!",
        date: `${Main.dates.day2}`,
        dateAndTime: `${Main.dates.day2}, 9:30 a.m. - 12:30 p.m.`,
        time: '9:30 a.m. - 12:30 p.m.',
        venue: 'Mass Media Lab (Main Block)',
        grades: '9 - 12',
        image: DS,
        accent: 'hsl(259, 67%, 25%)',
    },

    headings: {
        about: "In this arena, you are the one who holds all powers- the fate of the bright colours and the design as a whole lie in your hands.Turn your wild imaginations into virtual reality. Grab your chance to nurture creativity!",

        rules: [
            "Participants are allowed to make use of any application (such as Adobe Lightroom, Photoshop, Snapseed, Blender, Autodesk Maya, Affinity Designer, Procreate, PicsArt, Photoshop Express, Adobe Illustrator, Cinema 4D, Houdini) of their choice for designing their artwork.",
            "Participants are required to bring their own devices and accessories(Laptops,tablets).",
            "All the participants will be given 3 hours (including the time of rendering) to create their final artwork.",
            "The participants will be given a few topics on the spot, based on which they have to create a digital artwork.",
            "There will be only one round conducted.", 
            "The images after editing are to be submitted via e-mail as .jpg files."
        ],

        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Designscape"),

        registration: [
            "This is a Solo event - 3 participants per school "
        ]
    }
}

export default Designscape;
