//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import AoV from "../../../public/images/events/aov_logo.png";
import rocket from "../../../public/images/events/aov_games/rocket_league.png";
import fortnite from "../../../public/images/events/aov_games/fortnite.png";
import valorant from "../../../public/images/events/aov_games/valorant.jpg";
import cod from "../../../public/images/events/aov_games/cod.png";
import stgys from "public/images/events/aov_games/StumbleGuys.jpg";
import bgmi from "../../../public/images/events/aov_games/bgmi.png";
import csgo from "../../../public/images/events/aov_games/csgo.png";
import fifa from "public/images/events/aov_games/FIFA 23.png";

  
const ArenaOfValor = {
  title: "Arena of Valor",

  tagline: "Grab The Clutch And Feel The Power",

  link: "/events/arena-of-valor",

  details: {
    shortDescription:
      "Lightning-fast reflexes. Split-second decisions. Thousands of hours of practice. You'll need it all to emerge victorious at Arena of Valor, the most intense competitive gaming event in town. For the first time ever an opportunity is given to the students to showcase their gaming skills. Make the most of this chance! But when the dust has settled, there will be only one victor. Are you ready for the battle?",

    date: [
      `${Main.dates.day1}, 1:00 p.m. - 7:00 p.m.`,
      `${Main.dates.day2}, 9:30 a.m. - 3:00 p.m.`
    ],

    dateAndTime: `${Main.dates.day1}, 1:00 p.m. - 7:00 p.m. | ${Main.dates.day2}, 9:30 a.m. - 3:00 p.m.`,

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
      "Teams that attempt to use players which are not registered in their team (as shown in the team profile in the Discord Bot) may be disqualified.",
      "Account sharing will be met with disqualification.",
      "Abusing in-game glitches that give a team an unfair advantage is not permitted. Teams caught doing so may be disqualified.",
      "Depending on the settings for each individual tournament, more rules may apply for every match, such as banned items. If any special rules apply, then they may be found in the tournament’s registration article on this website.",
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
        name: "Console",

        description:
          "Arena of Valor - Console participants get to showcase their skills and strategy through discipline to the joystick .",

        games: [
          {
            name: "FIFA-23",
            participants: 2,
            image: fifa,
            bannedItems: [],
          },
        ],

        guidelines: [
          "Matches will be played in teams of two",
          "Teams can choose their own clubs, in case of conflict between two or more teams, the clubs will be assigned by a coin toss.",
          "Each match consists of 6 minute halves.",
          "The tournament is structured such that each team competes at least two matches before the semi-finals.",
          "Players cannot pause the game. A warning is given only the first time, if repeated the responsible team will be disqualified.",
          "Players cannot appeal against software or hardware errors. When relevant, replay will be reviewed and action will be taken accordingly.",
          "Verbal or physical conflict with other teams will lead to immediate disqualification.",
          "Each player is required to bring their own (PS4) controllers.",
          "Players are not allowed to handle the console outside the tournament and change any settings. Strict action will be taken.",
        ],
      },

      {
        name: "Mobile",

        description:
          "Arena of Valor - Mobile (individual)",

        games: [
          {
            name: "Stumble Guys",
            participants: 1,
            image: stgys,
            bannedItems: [],
          },
        ],

        guidelines: [
          "The event will be conducted online.",
          "Students must arrange a proper network connection, network issues will not be encouraged.",
          "The communication will be in an online meeting for which link will be sent to participants.",
          "Students are requested to arrange an extra device for the online meeting.",
          "If the participants do not join the meeting or does not respond to the heads they will be disqualified.",
          "Inappropriate behaviour from the students may lead to disqualification.",
          "Students should not use any emotes in the game. (eg. punching and etc)",
          "No arguments with the head of the particular event for a rematch or other things.", 
        ],
      },

      {
        name: "PC",

        description:
          "Arena of Valor - PC demands a sharp mind and trigger discipline.",

        games: [
          {
            name: "Fortnite",
            participants: 1,
            image: fortnite,
            bannedItems: [
            ],
          },
          {
            name: "Rocket League",
            participants: 3,
            image: rocket,
            bannedItems: [
            ],
          }
        ],

        guidelines: [
          "Teams that bring in different players (without permission) that are not registered in their team will be disqualified.",
          "Depending on the settings for each individual tournament, more rules may apply for every match, such as banned items.If any special rules apply, they shall be notified to the members.",
          "If teams fail to join their match during the given time limit, one or both teams may be disqualified. (Additional 5 mins will be given before disqualification).",
          "We reserve the right to edit the rules at any time and disqualify teams for reasons not stated in this list or take other action.",
          "We request all the players to be on time and stay active throughout the tournament.",
          "Kindly feel free to contact us anytime during the tournament regarding any queries.",
          "Players can only participate in one game in the PC category",

        ],
      },
    ],

    rules: [
      "Open for Grades 9 to 12.",
      "Students will participate in a series of matches of video games that they have registered for",
      "The game competitions will be run across 3 platforms namely CONSOLE (PS4,  Xbox, etc), PC (laptop or desktop), MOBILE (smartphones, etc) in which participants can only participate in one game per platform.",
      "Students can participate using any of the above platforms. Different platforms will NOT go against each other at any point.",
      "Participants are required to have a strong and stable internet connection.",
    ],

    eventCoordinators: EventCoordinators.filter((coordinator) =>
      coordinator.event.includes("Arena of Valor")
    ),

    registration: [
      "Registrations for each platform has to be done separately.",
      "Participants can register as ONE team for ONE game per platform.",
      "Console: Duo Team (2 members) – 3 teams per school",
      "Mobile:	Quad Team (4 members) - 3 teams per school",
      "PC: Fortnite - Solo - 3 players per school | Rocket League - Trios (3 members) - 3 teams per school",
    ],
  },
};

export default ArenaOfValor;
