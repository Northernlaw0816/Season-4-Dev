import { EventCoordinators } from "../../EventCoordinators";

import cod from '../../../public/images/events/aov_games/cod_logo.png'
import bgmi from '../../../public/images/events/aov_games/bgmi_logo.png'

const ArenaOfValor = {
    tagline: "Grab The Clutch And Feel The Power",
    
    headings: {
        about: {
            description: "Arena of Valor is all set to put your gaming skills on mettle and test your visuospatial and problem-solving skills. Split-second decisions and high-speed reflexes are quintessential to emerge victorious. For the first time ever an opportunity is given to the students to showcase their gaming skills.  Make the most of this chance!",
        },

        platforms: [
            {
                name: "Console",

                description: "Arena of Valor - Console participants get to run a gauntlet of games that truly tests their versatility and experience as players.",
                
                games: [
                    {
                        name: "Fortnite",
                        participants: 2,
                        logo: cod
                    },

                    {
                        name: "Rocket Leagues",
                        participants: 2,
                        logo: bgmi
                    }
                ]
            },
           
            {
                name: "Mobile",

                description: "Arena of Valor - Mobile offers intense team-based combat and strategy, all within a device that fits in the palm of your hands.",

                games: [
                    {
                        name: "Call Of Duty Mobile",
                        participants: 3,
                        logo: cod
                    },
                    {
                        name: "Battlegrounds Mobile India",
                        participants: 3,
                        logo: bgmi
                    }
                ]
            },
            
            {
                name: "PC",

                description: "Arena of Valor - PC demands a sharp mind and a patient trigger finger.",

                games: [
                    {
                        name: "Valorant",
                        participants: 3,
                        logo: cod
                    },
                    {
                        name: "Brawlhalla",
                        participants: 3,
                        logo: bgmi
                    }
                ]
            }
                
        ],
        
        rules: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?",
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event.includes("Arena of Valor")),

        registration: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nulla quasi esse illo dolores ipsa ipsum? Odio unde repellat assumenda nulla laborum nesciunt quos illum ad sed explicabo, quam asperiores?"
    }
}

export default ArenaOfValor;