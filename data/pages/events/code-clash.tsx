//data
import { EventCoordinators } from "../../EventCoordinators";

import Main from "../../Main"

import PB from "../../../public/images/events/pandora_blocks.png"

const CodeClash = {
    id: "code-klash",
    title: "Code Klash",

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
            "No more than 3 participants are allowed in a team. (No minimum limit).",
            "Participants will be provided with a computer to work on, hence one does not need to carry any device.",
            "Internet usage won’t be provided unless necessary.", 
            "Participants are free to use the following languages: JavaScript, Java, C++ and Python.",
            "The required code editor (Visual Studio Code) and modules will be pre-installed.", 
            "Work collaboratively within your team and do not interfere with other team’s projects/ideas.",
            "External help especially from AIs like ChatGPT, Gemini etc. is not entertained.",
            "In case of malpractices, all concerned groups and members will be held accountable & eliminated.",
            "It is a 1 day event that consists of 3 rounds.",
            ["Round 1: Error- Eradication:","Kick off the competition by showcasing your keen eye for detail! Participants will receive a sheet of code in their preferred language (from the four options previously mentioned) and will need to detect errors without system assistance. Stay sharp—eliminations may occur!"],
            ["Round 2: Algorithm Arena:","Demonstrate your problem solving prowess in this round. You will be given specific programming tasks to solve (This will be done through means of chit). Your solutions will be evaluated based on logical thinking and the quality of the output. To qualify for the next round you must complete within the provided time!"],
            ["Round 3: Code - Clash Showdown:","The ultimate showdown! The remaining teams, each consisting of three members, will face off in a high-stakes coding battle. The challenge? Solve the problem faster than your opponents. The clock is ticking—may the best team win!"]
            
        ],

/*        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],                              */
                                                                                                                                                
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event === "Code Clash"),

        registration: [
            "No more than 3 members in a team"
        ]
    }
}

export default CodeClash;
