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
      "Knockout is a debate competition on the best of topics relating to technology and the future. Raise your words, not your voice, and stand up for your stance. Use the weapon of words to wound your opponent. A sudden rush of adrenaline coursing through your veins and the urge to blurt out the plethora of arguments running through your mind. It's not about killing your enemy, it's about making them surrender. 'Nuff said. MIC. DROP!",
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
      "Knockout is a debate competition on the best of topics relating to technology and the future. Raise your words, not your voice, and stand up for your stance. Use the weapon of words to wound your opponent. A sudden rush of adrenaline coursing through your veins and the urge to blurt out the plethora of arguments running through your mind. It's not about killing your enemy, it's about making them surrender. 'Nuff said. MIC. DROP!",

    guidelines: [
      {
        title: "Day 1",
        rules: [
          "Round 1 (Solo 1 v 1 debate) will be conducted, whose detalis will be announced in the WhatsaApp group.",
          "Round 2 will be conducted with all participants, which will be an on-the-spot round.",
          "Eliminations will take place after Round 2."
        ],
      },

      {
          title: "Day 2",
          rules: [
              "Two on-the-spot rounds will be conducted.",
              "Elimination will take place after round 3",
              "At the end of Round 4, winners will be announced."
          ]
      }
    ],

    eventCoordinators: EventCoordinators.filter(
      (coordinator) => coordinator.event === "Knockout"
    ),

    registration: ["This is a Solo event."],
  },
};

export default KnockOut;
