//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import AoV from "../../../public/images/events/aov_logo.png";
import rocket from "../../../public/images/events/aov_games/rocket_league.png";
import fortnite from "../../../public/images/events/aov_games/fortnite.png";
import valorant from "../../../public/images/events/aov_games/valorant.jpg";
import cod from "../../../public/images/events/aov_games/cod.png";
import bgmi from "../../../public/images/events/aov_games/bgmi.png";
import csgo from "../../../public/images/events/aov_games/csgo.png";

const ArenaOfValor = {
  title: "Arena of Valor",

  tagline: "Grab The Clutch And Feel The Power",

  link: "/events/arena-of-valor",

  details: {
    shortDescription:
      "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intense competitive gaming event in town. For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for the battle?",

    date: [`${Main.dates.day1}, 1:00 p.m. - 7:00 p.m.`,
            `${Main.dates.day2}, 9:30 a.m. - 3:00 p.m.`],

    dateAndTime: `${Main.dates.day1}, 1:00 p.m. - 7:00 p.m. | ${Main.dates.day2}, 9:30 a.m. - 3:00 p.m.`,

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
        "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intense competitive gaming event in town. For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for the battle?",
    },

    commonGuidelines: [
      "The usage of cheats, hacks, or any other third-party applications that give you an unfair advantage over your opponents will result in immediate disqualification",
      "Teams that attempt to use players which are not registered in their team (as shown in the team profile in the Discord Bot) may be disqualified.",
      "Account sharing will be met with disqualification.",
      "Abusing in-game glitches that give a team an unfair advantage is not permitted. Teams caught doing so may be disqualified.",
      "Depending on the settings for each individual tournament, more rules may apply for every match, such as banned items. If any special rules apply, then they may be found in the tournament’s registration article on this website.",
      "If two teams fail to schedule their match during the given time limit, one or both teams may be disqualified.",
      "During an on-going tournament, players are not allowed to change their in-game name. Clan Tags before in-game names are allowed to be changed.",
      "It is prohibited to spam or use offensive messages or language on any of the  platforms and doing so may result in us taking punitive measures against you.",
      "We reserve the right to edit the rules at any time and disqualify teams for reasons not stated in this list or take other action.",
      "Participants are to join the Discord server link that will be sent to them via Whatsapp.",
      "Failure to comply with these rules will result in DISQUALIFICATION.",
      "The winning team should carry a screenshot of the scores at the end for proof.",
      "Match breaks will not be provided."
    ],

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
          "All contestants are supposed to participate in only one game (Fortnite or Rocket league)",
          "KEYBOARDS, MICE are NOT allowed",
          "The use of ANY of the following and similar is considered cheating: Multihacks, Wallhacks, AimBots.",
        ],
      },

      {
        name: "Mobile",

        description:
          "Arena of Valor - Mobile offers intense team-based combat and strategy, all within a device that fits in the palm of your hands.",

        games: [
          {
            name: "Call Of Duty Mobile",
            participants: 4,
            image: cod,
            bannedItems: [
              {
                category: "ScoreStreaks Banned",
                items: [
                  "Sentry Gun",
                  "VTOL",
                  "Care Package",
                  "Stealth Chopper",
                  "Hawk X3",
                  "Lightning Strike",
                  "Orbital Laser",
                ],
              },

              {
                category: "Weapons Banned",
                items: [
                  "NA-45",
                  "RYTEC AMR",
                  "PPSH-41",
                  "Cross-Bow",
                  "D13 Sector",
                  "Weapons attached with akimbo",
                ],
              },

              {
                category: "Lethal utility Banned",
                items: ["Thermite", "TripMine"],
              },

              {
                category: "Perks Banned",
                items: ["Martyrdom", "Restock", "Persistent"],
              },
              {
                category: "Operator Skills Banned",
                items: [
                  "H.I.V.E",
                  "Bull Charge",
                  "Ballistic shield",
                  "Kinetic armour",
                  "Tak-5",
                ],
              },
            ],
          },
          {
            name: "Battlegrounds Mobile India",
            participants: 4,
            image: bgmi,
            bannedItems: [],
          },
        ],

        guidelines: [
          "Participants are required to have all the resources needed for the chosen games downloaded prior to the event. e.g. Maps, Skins, etc...",
          "Controllers and Emulators are NOT allowed.",
          "The use of ANY of the following and similar is considered cheating: Multihacks, Wallhacks, AimBots.",
          "The banned items for the specific game must NOT be used in any part of the event.",
        ],
      },

      {
        name: "PC",

        description:
          "Arena of Valor - PC demands a sharp mind and trigger discipline.",

        games: [
          {
            name: "Valorant",
            participants: 5,
            image: valorant,
            bannedItems: [
            ],
          },
          {
            name: "CSGO",
            participants: 5,
            image: csgo,
            bannedItems: [
            ],
          }
        ],

        guidelines: [
          "DAY 1 - VALORANT ONLY, DAY 2 - CS:GO ONLY",
          "All games will be played in 5v5 format.",
          "Controllers ARE allowed.",
          "The use of the following programs is considered cheating: Wallhacks, Aimbot. These are only examples, other programs or methods may be considered cheats as well.",
          "Toxic behaviour will not be tolerated and will be dealt with strictly.",
          "In case a team member is not ready by the scheduled time , an additional time of maximum 2 mins will be given after which the team will have to proceed with/without the unready team member.",
          "All participants are to join the discord server link sent to them and use either valorant voice chat or discord voice chat.",
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
