//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import AoV from '../../../public/images/events/aov_logo.png'
import cod from '../../../public/images/events/aov_games/cod_logo.png'
import bgmi from '../../../public/images/events/aov_games/bgmi_logo.png'

const ArenaOfValor = {
    title: "Arena of Valor",

    tagline: "Grab The Clutch And Feel The Power",
    
    link: '/events/arena-of-valor',

    details: {
        shortDescription: "Arena of Valor is all set to put your gaming skills on mettle and test your visuospatial and problem-solving skills. Split-second decisions and high-speed reflexes are quintessential to emerge victorious.",
        date: `${Main.dates.day1} - ${Main.dates.day2}`,
        time: '4:30 PM to 7:30 PM',
        venue: 'Online',
        grades: '9 - 12',
        image: AoV,
        accent: 'linear-gradient(to bottom, hsl(180, 100%, 20%) 20%, hsl(0, 0%, 0%) 30%)',
    },

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
                        participants: 3,
                        logo: cod
                    },

                    {
                        name: "Rocket Leagues",
                        participants: 3,
                        logo: bgmi
                    }
                ],

                guidelines: [
                    "Participants are required to have all the resources needed for the chosen games downloaded prior to the event. e.g. Maps, Skins, etc...",,
                    "Controllers and Emulators are NOT allowed.",
                    "The use of ANY of the following and similar is considered cheating: Multihacks, Wallhacks, AimBots.",
                    "The banned items for the specific game must NOT be used in any part of the event.",
                    "Failure to comply with these rules will result in DISQUALIFICATION."
                ],

                bannedItems: {
                    bgmi: {
                        "ScoreStreaks Banned" : [
                            "Sentry Gun",
                            "VTOL"
                        ],
                        
                        "Guns Banned": [
                            "NA-45",
                            "HVK - "
                        ]
                    }
                }
            },
           
            {
                name: "Mobile",

                description: "Arena of Valor - Mobile offers intense team-based combat and strategy, all within a device that fits in the palm of your hands.",

                games: [
                    {
                        name: "Call Of Duty Mobile",
                        participants: 2,
                        logo: cod
                    },
                    {
                        name: "Battlegrounds Mobile India",
                        participants: 2,
                        logo: bgmi
                    }
                ],

                guidelines: [

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
                    }
                ],

                guidelines: [

                ]
            }
                
        ],
        
        rules: [
            "Open for Grades 9 to 12",
            "Students will participate in a series of matches of video games that they have registered for",
            "The game competitions will be run across 3 platforms namely CONSOLE (PS4,  Xbox, etc), PC (laptop or desktop), MOBILE (smartphones etc)",
            "Students can participate using any of the above platforms. Different platforms will not go against each other at any point",
            "The timing of each game will be different",
            "Participants are required to have a strong and stable internet connection.",
        ],
        
        eventCoordinators: EventCoordinators.filter(coordinator => coordinator.event.includes("Arena of Valor")),

        registration: [
            "Participants can register as a team for all three platforms.",
            "Registration for each platform has to be done separately.",
            "2 team members for Console can be chosen from the given names.",
            "Participants are only allowed to compete in ONE game for the Mobile platform.",
        ]
    }
}

export default ArenaOfValor;