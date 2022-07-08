//data
import { EventCoordinators } from "../../EventCoordinators";

import BD from "../../../public/images/events/bass_drop.png"

import Main from "../../Main"

const Bassdrop = {
  title: "Bass Drop",

  tagline: "A Mix of Magic",

  link: "/events/bassdrop",

  details: {
    shortDescription: "Are you someone who constantly taps your feet to rhythmic beats and hums to the melodious tunes of songs? This is the opportunity for you to unleash your inner maestro, to take a basic track and transform it into something fresh that makes us want to come-back for more!",
    date: `${Main.dates.day2}`,
    dateAndTime: `${Main.dates.day2} -> 9:30 a.m. - 12:30 p.m.`,
    time: "9:30 a.m. - 12:30 p.m.",
    venue: "Creya Lab",
    grades: "9-12",
    image: BD,
    accent: "hsl(0, 0%, 0%)",
  },

  headings: {
    about:
      "Are you someone who constantly taps your feet to rhythmic beats and hums to the melodious tunes of songs? This is the opportunity for you to unleash your inner maestro, to take a basic track and transform it into something fresh that makes us want to come-back for more!",
    rules: [
      "Bass drop is a solo offline event, with no access to the internet",
      "The tracks created by the participants should be for 2 minutes",
      "Participants are to bring their own laptops, and accessories(No loudspeakers allowed).",
      "Participants can decide on the genre of the track for remixing.",
      "Participants can use any DAW (Digital Audio Workstation) of their choice, and that doesn't have smart suggestion programs. (FL Studio, Ableton, Virtual DJ, Logic Pro, Cubase, Presonus Studio One, etc).",
      "Paid Plugins are not allowed, in order to conduct a fair event.",
      "There is only 1 round, which lasts for the duration of 5 hours.",
      "Songs to be exported in the format of  .mp3 or .wav",
    ],

    assessment: [
      "Creativity",
      "Factual Accuracy",
      "Grammatical Accuracy",
      "Organisation",
    ],

    eventCoordinators: EventCoordinators.filter(
      (coordinator) => coordinator.event === "Bass Drop"
    ),

    registration: ["This is a Solo event."],
  },
};

export default Bassdrop;
