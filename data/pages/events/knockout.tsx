//stylesheets
import styles from "../../../styles/pages/Events.module.scss";
//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import KO from "../../../public/images/events/ko_logo.png";

const KnockOut = {
  id: "knockout",
  title: "Knockout!",

  tagline: (
    <>
      Connect the <span className={styles.blue}>Dots</span>, Battle
      your <span className={styles.red}>Thoughts</span>.
    </>
  ),

  link: "/events/knockout",

  details: {
    shortDescription:
      "Who said words can't hurt? Knockout is a debate competition combining the action of arguments on topics about technology and future with the rush of being the first to think out of the box. The drama is real and the tea is at the edge of the table waiting to spill as the debate gets intense. Will the heat die down or switch directions into your words? It's not about who is the fastest, not about who is the quickest but about who is and will be THE BEST.",
    date: [`${Main.dates.day1}, 10:30 a.m. - 3:00 p.m.`,
                  `${Main.dates.day2}, 9:30 a.m. - 1:30 p.m.`],
    dateAndTime: `${Main.dates.day1}, 10:30 a.m. - 3:00 p.m. | ${Main.dates.day2}, 9:30 a.m. - 1:00 p.m.`,
    time: ``,
    venue: "Conference Hall",
    grades: "9 - 12",
    image: KO,
    accent: "black",
  },

  headings: {
    finalists: [{ name: "", grade: "" }],

    about:
      "Who said words can't hurt? Knockout is a debate competition combining the action of arguments on topics about technology and future with the rush of being the first to think out of the box. The drama is real and the tea is at the edge of the table waiting to spill as the debate gets intense. Will the heat die down or switch directions into your words? It's not about who is the fastest, not about who is the quickest but about who is and will be THE BEST.",

    guidelines: [
      {
        title: "Day 1",
        rules: [
          "Round 1 - All participants will be given a topic prior to the event. Each individual will be given one minute to speak",
          "Round 2 - A debate with the topics being announced on spot.",
          "This will be the debate round, cross talk will be allowed and the judge will be the moderator of the speech.",
          "Eliminations will take place after each round."
        ],
      },

       {
        title: "Round 1 Question",
        rules: [
          "TBA"
        ],
      },

      {
          title: "Day 2",
          rules: [
              "Round 3 - The remaining competitors will be divided into pairs and will have a 1v1 (turn coat style) on the topic given (on spot).",
              "Eliminations after round 3 - The winner of each 1v1 moves to round 4.",
              "Round 4 - Grand Finale.",
              "Points are scrapped after every round, thus each contestant starts from 0 in every round."
          ]
      }
    ],

    eventCoordinators: EventCoordinators.filter(
      (coordinator) => coordinator.event === "Knockout"
    ),

    registration: ["This is an individual event."],
  },
};

export default KnockOut;
