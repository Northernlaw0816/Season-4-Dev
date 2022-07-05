//stylesheets
import styles from "../../../styles/pages/Events.module.scss";
//data
import Main from "../../Main";
import { EventCoordinators } from "../../EventCoordinators";
//assets
import KO from "../../../public/images/events/ko_logo.png";

const KnockOut = {
  title: "Knockout!",

  tagline: (
    <>
      There Are No Tough <span className={styles.blue}>Opponents</span>, Only
      Tough <span className={styles.red}>Issues</span>.
    </>
  ),

  link: "/events/knockout",

  details: {
    shortDescription:
      "There are no tough opponents, only tough issues! Raise your words, not your voice, and stand up for your stance. Use the weapon of words to wound your opponent. A sudden rush of adrenaline coursing through your veins and the urge to blurt out the plethora of arguments running through your mind.It's not about killing your enemy, it's about making them surrender. 'Nuff said. MIC.DROP!",
    date: `${Main.dates.day1} - ${Main.dates.day2}`,
    time: "10:40 a.m. - 3:00 p.m. / 9:30 a.m. - 12:30 p.m.",
    venue: "A.V. Hall",
    grades: "9 - 12",
    image: KO,
    accent: "black",
  },

  headings: {
    finalists: [{ name: "", grade: "" }],

    about:
      "A battlefield where your words become your weapons. A sudden rush of adrenaline in your veins and a desperate need to protect yourself. Knockout is a debate competition on the best of topics relating to technology and the future. It's not about killing your enemy, it's about making them surrender.",

    guidelines: [
      {
        title: "Preliminary Round",
        rules: [
          "Preliminary debate rounds (Solo 1 v 1) will be conducted.",
          "Subsequent rounds may be held for qualifying students.",
          "Just one category (For all age groups).",
          "Topics of the preliminary round will be announced before the competition.",
          "Use of diplomatic language encouraged.",
        ],
      },

      // {
      //     title: "Final Round",
      //     rules: [
      //         "Only 10 participants will be selected for the finals",
      //         "They will be divided into 5 pairs",
      //         "Each pair will be given a debate topic and each participant a \"For\" or \"Against\" stance",
      //         "A one-on-one formal debate will be held for each pair wherein each participant has to make a speech of 2 to 3 minutes.",
      //         "Each participant will be allowed to ask 1 question and 1 follow up question to their respective partners ",
      //         "The topics and the finalists list will be released on Feb 8 2022",
      //         "From the 10 finalists 1 winner and 1 runner up will be awarded.",
      //         "Finals will be held on the following day (Feb 9) and topics will be announced by 8th Feb itself"
      //     ]
      // }
    ],

    eventCoordinators: EventCoordinators.filter(
      (coordinator) => coordinator.event === "Knockout"
    ),

    registration: ["This is a Solo event."],
  },
};

export default KnockOut;
