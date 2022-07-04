//data
import { EventCoordinators } from "../../EventCoordinators";

const Bassdrop = {
  title: "Bass Drop",

  tagline: "Mix and Remix",

  link: "/events/bassdrop",

  details: {
    shortDescription: "",
    date: "TBA",
    time: "TBA",
    venue: "TBA",
    grades: "",
    image: "",
    accent: "hsl(243, 32%, 11%)",
  },

  headings: {
    about:
      "Are you someone who constantly taps their feet to rhythmic beats and hums to the melodious tunes of songs? This is the opportunity for you to unleash your inner maestro, to take a basic track and transform it into something fresh that makes us want to come-back for more!",
    rules: [
      "Bass drop is a solo offline event, with no access to the internet",
      "The tracks created by the participants should be for 2 minutes",
      "Participants are to bring their own laptops, and accessories(No loudspeakers allowed).",
      "Participants can decide on the genre of the track for remixing.",
      "Participants can use any DAW (Digital Audio Workstation) of their choice, and that doesn't have smart suggestion programs. (FL Studio, Ableton, Virtual DJ, Logic Pro, Cubase, Presonus Studio One, etc).",
      "Paid Plugins are not allowed, in order to conduct a fair event.",
      "There is only 1 round, which lasts for the duration of 5 hours.",
      "Songs to be exported in the format of  .mp3 or .wav",
      "*rules might change based on the problems found while using software for testing out the tracks.",
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
