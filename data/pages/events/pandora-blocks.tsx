//data
import { EventCoordinators } from "../../EventCoordinators";

const PandoraBlocks = {
    title: "Pandora Blocks",

    tagline: "Curate and Create!",

    link: '/events/pandora-blocks',

    details: {
        shortDescription: "Survival of the fastest. This event will test your speed, intelligence and creativity all at once.Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds.",
        date: 'TBA',
        time: 'TBA',
        venue: 'TBA',
        grades: '',
        image: undefined,
        accent: 'hsl(243, 32%, 11%)',  
    },
    
    headings: {
        about: "Survival of the fastest. This event will test your speed, intelligence and creativity all at once.Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds.",
        
        rules: [
            "Bass drop is a solo offline event, with no access to the internet",
            "The tracks created by the participants should be for 2 minutes",
            "Participants are to bring their own laptops, and accessories(No loudspeakers allowed).",
            "Participants can decide on the genre of the track for remixing.","Participants can use any DAW (Digital Audio Workstation) of their choice, and that doesn't have smart suggestion programs. (FL Studio, Ableton, Virtual DJ, Logic Pro, Cubase, Presonus Studio One, etc).", "Paid Plugins are not allowed, in order to conduct a fair event.","There is only 1 round, which lasts for the duration of 5 hours.", "Songs to be exported in the format of  .mp3 or .wav","*rules might change based on the problems found while using software for testing out the tracks."
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Log and Blog"),

        registration: [
            "This is a Solo event."
        ]
    }
}

export default PandoraBlocks;