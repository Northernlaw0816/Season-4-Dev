//data
import { EventCoordinators } from "../../EventCoordinators";

import Main from "../../Main"

import PB from "../../../public/images/events/pandora_blocks.png"

const CodeClash = {
    title: "Code Clash",

    tagline: "Build Beyond Imagination",

    link: '/events/code-clash',

    details: {
        shortDescription: "Welcome to Pandora’s Blocks, where creativity flourishes and virtual worlds come to life! Here, you will face adversities that will test your team’s communication, synergy and time management. Your goal is to build the most magnificent monument relevant to the theme in the given time and area. The creators of the most theme-relevant, unique, creative and swiftly built monument takes it all.",
        dateAndTime: [`${Main.dates.day1}, 10:15 a.m. - 3:00 p.m.`],
        date: `${Main.dates.day1}`,
        time: '10:15 a.m. - 3:00 p.m.',
        venue: 'Online',
        grades: '9-12',
        image: PB,
        accent: '#25415e',  
    },
    
    headings: {
        about: "Welcome to Pandora’ s Blocks, where creativity flourishes and virtual worlds come to life! Here, you will face adversities that will test your team’s communication, synergy and time management. Your goal is to build the most magnificent monument relevant to the theme in the given time and area. The creators of the most theme-relevant, unique, creative and swiftly built monument takes it all.",
        
        rules: [
            "This is a team event. A team must have 3 players.",
            "Two rounds will be conducted",
            "Participants from grade 9 and above can participate.",
            "Participants are supposed to use version 1.20.1 only.", 
            "Participants are not allowed to switch Minecraft accounts during the event.",
            "Creative mode will be allowed to all teams.", 
            "Teams will be allotted their respective plots.",
            "Teams are not allowed to change their plots or go to a plot belonging to a different team.",
            "The time allotted is 2 hours 30 minutes to build for each round.",
            "Teams are not allowed to use any sort of hacks/cheats/clients. Use of such malpractices will result in immediate disqualification.",
            "If any participant is found to be griefing, building inappropriate structures, or disturbing / sabotaging other teams, the team will be disqualified.",
            "We reserve the right to modify the rules at any time as deemed necessary.",
            "The event will be managed through Whatsapp and Discord"
        ],

        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],
                                                                                                                                                
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Pandora's Blocks"),

        registration: [
            "Participants register Trio Teams (3 members) - 3 teams per school"
        ]
    }
}

export default CodeClash;
