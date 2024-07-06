//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import AoV from "../../../public/images/events/aov_logo.png";
  
const ArenaOfValor = {
  id: "arena-of-valor",
  title: "Arena of Valor",
  tagline: "Grab The Clutch And Feel The Power",
  link: "/events/arena-of-valor",
  details: {
    shortDescription:
      "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intense competitive gaming event in town. For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for the battle?",

    date: [
      `${Main.dates.day1}, 1:00 p.m. - 7:00 p.m.`,
      `${Main.dates.day2}, 9:30 a.m. - 2:30 p.m.`
    ],

    dateAndTime: `${Main.dates.day1}, 10:00 p.m. - 7:00 p.m. | ${Main.dates.day2}, 9:30 a.m. - 1:30 p.m.`,

    time: "TBA",

    venue: "Online",
    grades: "9 - 12",
    image: AoV,
    accent:
      "linear-gradient(to bottom, hsl(180, 100%, 20%) 20%, hsl(0, 0%, 0%) 20%)",
  },

  headings: {
    about: {
      description:
        "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intense competitive gaming event in town. For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for the battle?",
    },

    commonGuidelines: [
      "The usage of cheats, hacks, or any other third-party applications that give you an unfair advantage over your opponents will result in immediate disqualification",
      "Teams that attempt to use players which are not registered in their team will be disqualified.",
      "Account sharing will be met with disqualification.",
      "Abusing in-game glitches that give a team an unfair advantage is not permitted. Teams caught doing so may be disqualified.",
      "Depending on the settings for each individual tournament, more rules may apply for every match, such as banned items. If any special rules apply, then they may be found in the tournament’s registration article.",
      "If two teams fail to schedule their match during the given time limit, one or both teams may be disqualified.",
      "During an on-going tournament, players are not allowed to change their in-game name. Clan Tags before in-game names are allowed to be changed.",
      "It is prohibited to spam or use offensive messages or language on any of the  platforms and doing so may result in us taking punitive measures against you.",
      "We reserve the right to edit the rules at any time and disqualify teams for reasons not stated in this list or take other action.",
      "Participants will be be contacted through Whatsapp.",
      "Failure to comply with these rules will result in DISQUALIFICATION.",
      "The winning team should carry a screenshot of the scores at the end for proof.",
      "Match breaks will not be provided."
    ],

    platforms: [
      {
        name: "PC",

        description:
          "Arena of Valor - PC demands a sharp mind and trigger discipline.",

        games: [
          {
            id: "valorant",
            name: "Valorant",
            participants: 5,
            image: "Valorant.jpg",
            bannedItems: [
            ],
            guidelines: [
              "Teams must consist of 4 players.",
              "Players are required to compete under their registered account names; altering in-game identities post-registration is strictly prohibited.              .",
              "Detailed in-game regulations will be communicated by tournament organizers on the event day.              .",
              "Non-compliance with these rules will lead to automatic disqualification.",
              "Participants are expected to ensure a reliable network connection; connectivity issues will not be accommodated.",
              "Communication will be facilitated through an online meeting. Participants will receive a dedicated link from organizers on the event day.Failure to join the designated meeting or respond promptly to organizers may result in disqualification.",
              "At least one player per team must have access to an additional device for uninterrupted communication during the online meeting",
            ],
          },
          {
            id: "minecraft",
            name: "Minecraft",
            participants: 2,
            image: "Minecraft.jpg",
            bannedItems: [],
            guidelines: [
              "This is a team event. A team must have 2 players.",
              "Three rounds will be conducted with point-based system.",
              "Participants are supposed to use version 1.20.2 Java edition only.",
              "Participants are not permitted to change username and accounts.",
              "Discord and Whatsapp are the means of communication.We require your gaming device to have a functional camera and microphone. We may also require screen sharing at times.",
              "Three rounds will be conducted over the course of 2 days.",
              ["Round 1 : Parkour", "A single parkour course will be the challenge for all teams.","A team will be given only one run through where both of the members must complete the course.",],
              ["Round 2 : Build", "Each team will be allotted a 4x4 chunk with signs indicating the teams and school name.","Creative mode will be set for everyone. Teams will be given 1.5 hours to build based on the given topic.","If any participant is found to be griefing - such as building inappropriate structures or sabotaging other teams, or using mods/plugins - the team will be disqualified from the round."],
              ["Round 3 : Battle Royale","Survival mode with normal difficulty will be set for everyone.","A total of 3 matches will be conducted where the teams must gather resources and be the last team standing while the zone shrinks periodically.","Loot Boxes will be present throughout the map.","Points are earned through placements and eliminations."],
            ],
          }
        ],

        eventCoordinators: EventCoordinators.filter((coordinator) =>
          coordinator.event.includes("Arena of Valor - PC")
        ),
      },

      {
        name: "Console",

        description:
          "Welcome to Arena of Valor - Console (FIFA-23) where your teamwork, coordination, football knowledge and mechanical skills are put to the ultimate test in a competitive tournament.",

        games: [
          {
            id: "fifa",
            name: "FIFA-23",
            participants: 2,
            image: "fifa.png",
            bannedItems: [],
            guidelines: [
              "Matches will be played in teams of two with each match consists of two 6 minute halves",
              "Each team must consist of two members only",
              "The tournament is structured such that each team competes at least two matches before the semi-finals",
              "Players cannot pause the game. A warning is given only the first time, if repeated the responsible team will be disqualified",
              "Players cannot appeal against software or hardware errors. When relevant, replay will be reviewed and action will be taken accordingly",
              "Verbal or physical conflict with other teams will lead to immediate disqualification",
              "Each player is required to bring their own (PS4) controllers.Players are not allowed to handle the console outside the tournament and change any settings. Strict action will be taken.",
              "Teams are discouraged from sharing controllers with other teams to avoid any damages",
              "Teams will be asked to choose their clubs prior to the event, both international and league clubs are allowed. In case of multiple teams choosing the same club, the allotment are made on a first come basis"


            ],
          },
        ],

        eventCoordinators: EventCoordinators.filter((coordinator) =>
          coordinator.event.includes("Arena of Valor - Console")
        ),
      },

      {
        name: "Mobile",

        description:
          "Arena of Valor - Mobile",

        games: [
          {
            
            id: "bgmi",
            name: "Battlegrounds Mobile India (BGMI)",
            participants: 3,
            image: "bgmi.png",
            bannedItems: [],
            guidelines: [
              "Players must use their own IDs.",
              "The usage of any type of cheating software or inappropriate behavior will result in immediate disqualification",
              "Event Head's decision is final.",
              "Participants are required to have all the resources needed for the chosen maps downloaded prior to the event.",
              "Participants are requested to have a good internet connection and a device",
              "Coordinating and responding to the event heads is mandatory"
            ],
          },
          {
            
            id: "cod",
            name: "Call of Duty Mobile",
            participants: 3,
            image: "cod.png",
            bannedItems: [],
            guidelines: [
              "The usage of cheats, hacks, or any other third-party applications that give you an unfair advantage over your opponents will result in immediate disqualification. Teams or players may also be banned from future tournaments .",
              "Account sharing will be met with disqualification. Only the original owner of the Call of Duty: Mobile account may use it in tournaments.",
              ["Customisations:", "Skins, Weapon Variants and Purchased Weapons that alter the default iron sights and/or ANY weapon properties (damage, speed, etc) are NOT allowed", "Iron sight changes are NOT allowed.", "Cosmetic weapons are allowed, but MUST use default weapon iron sights."],
              "By participating in our tournaments, all participants automatically agree that they vow to respect fellow participants.",
              "Use of ‘jailbroken’ or ‘rooted’ devices in the tournament are not permitted.",
              "We reserve the right to modify the rules at any time, with prior notice, and disqualify or take other action against teams for reasons that may not be stated above.",
            ],
          },
          {
            id: "freefire",
            name: "Free Fire",
            participants: 4,
            image: "ff.png",
            bannedItems: [],
            guidelines: [
              "The tournament will be held in custom rooms.",
              "Teams will be divided into groups depending on the number of registered teams.",
              "Players are expected to be present at the exact times for their matches as announced.",
              "Hacking or otherwise modifying the intended behavior of the game client is prohibited.",
              "Impersonating an eligible player by attempting to alias them, using their account or by any other method is prohibited and will result in the aliasing player and the player they are aliasing as being removed from the tournament.",
            ],
          },
        ],

        

        eventCoordinators: EventCoordinators.filter((coordinator) =>
          coordinator.event.includes("Arena of Valor - Mobile")
        ),
      },
      
    ],

    rules: [
      "Open for Grades 9 to 12.",
      "Students will participate in a series of matches of video games that they have registered for",
      "The game competitions will be run across 3 platforms namely CONSOLE (PS4,  Xbox, etc), PC (laptop or desktop), MOBILE (smartphones, etc)",
      "Students can participate using any of the above platforms. Different platforms will NOT go against each other at any point.",
      "Participants are required to have a strong and stable internet connection.",
    ],

    registration: [
      "Console : Duos",
      "Mobile :	 BGMI and COD - Trios | Free Fire - Squads",
      "PC : Valorant - Squads | Minecraft - Duos ",
    ],
  },
};

export default ArenaOfValor;
