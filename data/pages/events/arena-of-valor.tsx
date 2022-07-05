//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import AoV from "../../../public/images/events/aov_logo.png";
import rocket from "../../../public/images/events/aov_games/rocket_league.png";
import fortnite from "../../../public/images/events/aov_games/fortnite.png";
import valorant from "../../../public/images/events/aov_games/valorant.jpg";
import cod from "../../../public/images/events/aov_games/cod.png";
import bgmi from "../../../public/images/events/aov_games/bgmi.jpg";

const ArenaOfValor = {
  title: "Arena of Valor",

  tagline: "Grab The Clutch And Feel The Power",

  link: "/events/arena-of-valor",

  details: {
    shortDescription:
      "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intensely competitive gaming event in town.For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for battle?",
      
    date: `${Main.dates.day1} - ${Main.dates.day2}`,

    time: "TBA",
    
    venue: "Online",
    grades: "9 - 12",
    image: AoV,
    accent:
      "linear-gradient(to bottom, hsl(180, 100%, 20%) 20%, hsl(0, 0%, 0%) 30%)",
  },

  headings: {
    about: {
      description:
        "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intensely competitive gaming event in town.For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for battle?",
    },

    platforms: [
      {
        name: "Console",

        description:
          "Arena of Valor - Console participants get to run a gauntlet of games that truly tests their versatility and experience as players.",

        games: [
          {
            name: "Fortnite",
            participants: 2,
            image: fortnite,
            bannedItems: [],
          },

          {
            name: "Rocket League",
            participants: 2,
            image: rocket,
            bannedItems: [],
          },
        ],

        guidelines: [
          "All games will be played in 2v2 format",
          "All contestants are supposed to participate in both games (Fortnite, Rocket league)",
          "KEYBOARDS, MICE are not allowed",
          "The use of ANY of the following and similar is considered cheating: Multihacks, Wallhacks, AimBots.",
          "Failure to comply with these rules will result in DISQUALIFICATION.",
          "In multiplayer if both teams are ready , match can start however additional in match breaks will not be allowed.",
          "The winning team should carry a screenshot of the scores at the end for proof.",
        ],
      },

      {
        name: "Mobile",

        description:
          "Arena of Valor - Mobile offers intense team-based combat and strategy, all within a device that fits in the palm of your hands.",

        games: [
          {
            name: "Call Of Duty Mobile",
            participants: 3,
            image: cod,
            bannedItems: [
              {
                category: "ScoreStreaks Banned",
                items: ["Sentry Gun", "VTOL"],
              },

              {
                category: "Guns Banned",
                items: [
                  "NA-45",
                  "HVK - Large Calibre Ammo",
                  "Guns Equipped with Akimbo Perk",
                ],
              },

              {
                category: "Equipments Banned",
                items: ["Molotov", "TripMine"],
              },

              {
                category: "Perks Banned",
                items: ["Hardline", "Restock", "Persistent"],
              },
            ],
          },
          {
            name: "Battlegrounds Mobile India",
            participants: 3,
            image: bgmi,
            bannedItems: [],
          },
        ],

        guidelines: [
          "Participants are required to have all the resources needed for the chosen games downloaded prior to the event. e.g. Maps, Skins, etc...",
          ,
          "Controllers and Emulators are NOT allowed.",
          "The use of ANY of the following and similar is considered cheating: Multihacks, Wallhacks, AimBots.",
          "The banned items for the specific game must NOT be used in any part of the event.",
          "Failure to comply with these rules will result in DISQUALIFICATION.",
          "In multiplayer if both teams are ready , match can start however additional in match breaks will not be allowed.",
          "The winning team should carry a screenshot of the scores at the end for proof.",
        ],
      },

      {
        name: "PC",

        description:
          "Arena of Valor - PC demands a sharp mind and trigger discipline.",

        games: [
          {
            name: "Valorant",
            participants: 3,
            image: valorant,
            bannedItems: [
              {
                category: "Guns Banned",
                items: ["Odin"],
              },
            ],
          },
        ],

        guidelines: [
          "All games will be played in 5v5 format.",
          "Controllers are allowed.",
          "Valorant (games will be played in an 'unrated'  format).",
          "CSGO (games will be played in 'plant the bomb' format).",
          "The use of the following programs is considered cheating: Wallhacks, Aimbot. These are only examples , other programs or methods may be considered cheats as well.",
          "Toxic behaviour will not be tolerated and will be dealt with strictly.",
          "In multiplayer if both teams are ready, the match may start before the scheduled time, however no timeouts will be provided.",
          "In case a team member is not ready by the scheduled time , an additional time of maximum 2 mins will be given after which the team will have to proceed with/without the unready team member.",
          "All participants are to join the discord server link sent to them and use either valorant voice chat or discord voice chat.",
          "The winning team should carry a screenshot of the scores at the end for proof.",
        ],
      },
    ],

    rules: [
      "Open for Grades 9 to 12",
      "Students will participate in a series of matches of video games that they have registered for",
      "The game competitions will be run across 3 platforms namely CONSOLE (PS4,  Xbox, etc), PC (laptop or desktop), MOBILE (smartphones etc)",
      "Students can participate using any of the above platforms. Different platforms will not go against each other at any point",
      "The timing of each game will be different",
      "Participants are required to have a strong and stable internet connection.",
    ],

    eventCoordinators: EventCoordinators.filter((coordinator) =>
      coordinator.event.includes("Arena of Valor")
    ),

    registration: [
      "Participants can register as a team for all three platforms.",
      "Registration for each platform has to be done separately.",
      "2 team members for Console can be chosen from the given names.",
      "Participants are only allowed to compete in ONE game for the Mobile platform.",
      'Participants must use the same Team Name and have the same members if registering for multiple platforms of "Arena of Valor".',
    ],
  },
};

export default ArenaOfValor;
