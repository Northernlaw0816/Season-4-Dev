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
      There Is <span className={styles.blue}>No Such Thing</span>, As
      An <span className={styles.red}>Irrelevant Argument</span>.
    </>
  ),

  link: "/events/knockout",

  details: {
    shortDescription:
      "Who said words can't hurt? Knockout is a debate competition combining the action of arguments on topics about technology and future with the rush of being the first to think out of the box. The drama is real and the tea is at the edge of the table waiting to spill as the debate gets intense. Will the heat die down or switch directions into your words? It's not about who is the fastest, not about who is the quickest but about who is and will be THE BEST.",
    date: [`${Main.dates.day1}, 10:30 a.m. - 3:00 p.m.`,
                  `${Main.dates.day2}, 9:30 a.m. - 1:00 p.m.`],
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
          "Round 1 - All participants will be given a topic prior to the event through Whatsapp. Each individual will be given time to introduce their take on the topic given.",
          "Round 2 - Participants will be assigned a role and given a crisis.",
          "Everyone will present their stances on the same within a time of 60 seconds.",
          "This will be the debate round, cross talk will be allowed and the judge will be the moderator of the speech.",
          "Eliminations will take place after Round 2."
        ],
      },

       {
        title: "Round 1 Question",
        rules: [
          "<b>Cryonics is the preservation of human bodies in freezing temperatures to revive them in the future. This however has raised several questions related to its safety and morality. Present your thoughts on the same by either supporting the idea or disapproving it with valid reasons and facts.<b>"
        ],
      },

      {
          title: "Day 2",
          rules: [
              "Round 3 - The remaining competitors will be divided into pairs and will have a 1v1 on a given topic on the spot.",
              "Eliminations after round 3 - The winner of each 1v1 moves to round 4.",
              "Round 4 - The finalists will be given a topic on the spot and will have to present their stance on the same.",
              "Points are scrapped after every round, thus each contestant starts from 0 in every round."
          ]
      }
    ],

    eventCoordinators: EventCoordinators.filter(
      (coordinator) => coordinator.event === "Knockout"
    ),

    registration: ["This is a Solo event - 3 participants per school"],
  },
};

export default KnockOut;
