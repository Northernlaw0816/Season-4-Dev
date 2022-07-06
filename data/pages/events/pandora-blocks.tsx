//data
import { EventCoordinators } from "../../EventCoordinators";

import Main from "../../Main"

import PB from "../../../public/images/events/pandora_blocks.png"

const PandoraBlocks = {
    title: "Pandora's Blocks",

    tagline: "Build your curiosity",

    link: '/events/pandora-blocks',

    details: {
        shortDescription: "Survival of the fastest. This event will test your speed, intelligence and creativity all at once. Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds.",
        date: `${Main.dates.day1}`,
        time: '10:40 a.m. - 3:00 p.m.',
        venue: 'Online',
        grades: '9-12',
        image: PB,
        accent: '#1d3249',  
    },
    
    headings: {
        about: "Survival of the fastest. This event will test your speed, intelligence and creativity all at once. Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds.",
        
        rules: [
            "This is a team event. A team must have 3 players.",
            "Participants from grade 9 and above can participate.",
            "Teams will be allotted their respective sandstone plots.",
            "Participants are supposed to use version 1.17.1 only.", 
            "Creative mode will be allowed to all teams.",
            "Participants are not allowed to make changes to the island, they are only allowed to build on top of the sandstone platform.", 
            "Participants shall not build in ways that will disturb the terrain [like making changes to the water under].",
            "Teams are not allowed to change/move/go to another plot belonging to a different team.",
            "The time allotted is 3 hours to build.",
            "Teams are not allowed to use any sort of hacks/cheats/clients. Use of such malpractices will result in immediate disqualification.",
            "If any participant is found to be disturbing other teams, the team will be disqualified."
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Pandora's Blocks"),

        registration: [
            "This is a Trio event."
        ]
    }
}

export default PandoraBlocks;