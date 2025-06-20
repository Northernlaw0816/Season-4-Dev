//data
import { EventCoordinators } from "../../EventCoordinators";

import Main from "../../Main";

import ck from "../../../public/images/events/ck_logo.png";

const CodeKlash = {
	id: "code-klash",
	title: "Code Klash",

	tagline: "Code, Compete, Conquer!",

	link: "/events/code-klash",

	details: {
		shortDescription:
			"Do you think you can participate in the battle royale of coding? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Code Klash!",
		dateAndTime: [`${Main.dates.day2}, 10:00 a.m. - 2:00 p.m.`],
		date: `${Main.dates.day2}`,
		time: "10:00 a.m. - 2:00 p.m.",
		venue: "Computer Lab (Secondary Block)",
		grades: "9-12",
		image: ck,
		accent: "#141615",
	},

	headings: {
		about:
			"Do you think you can participate in the battle royale of coding? Can you create a program, not only error-free but in a jiffy? If you think you're ready to put your skills to the test, participate in Code Klash!",

		rules: [
			"Participants will be provided with a computer to work on, hence one does not need to carry any device.",
			"Internet usage won’t be provided unless necessary.",
			"Participants are free to use the following languages: JavaScript, Java, C++ and Python.",
			"The required code editor (Visual Studio Code) and modules will be pre-installed.",
			"Work collaboratively within your team and do not interfere with other team’s projects/ideas.",
			"External help especially from AIs like ChatGPT, Gemini etc. is not entertained.",
			"In case of malpractices, all concerned groups and members will be held accountable & eliminated.",
			"It is a 1 day event that consists of 3 rounds.",
			[
				"Round 1: Error- Eradication:",
				"Kick off the competition by showcasing your keen eye for detail! Participants will receive a sheet of code in their preferred language (from the four options previously mentioned) and will need to detect errors without system assistance. Stay sharp—eliminations may occur!",
			],
			[
				"Round 2: Algorithm Arena:",
				"Demonstrate your problem solving prowess in this round. You will be given specific programming tasks to solve (This will be done through means of chit). Your solutions will be evaluated based on logical thinking and the quality of the output. To qualify for the next round you must complete within the provided time!",
			],
			[
				"Round 3: Code - Klash Showdown:",
				"The ultimate showdown! The remaining teams, each consisting of three members, will face off in a high-stakes coding battle. The challenge? Solve the problem faster than your opponents. The clock is ticking—may the best team win!",
			],
		],

		/*        assessment: [
            "Creativity",
            "Factual Accuracy",
            "Grammatical Accuracy",
            "Organisation"
        ],                              */

		eventCoordinators: EventCoordinators.filter((coordinator) => coordinator.event === "Code Klash"),

		registration: ["Participants register in teams of three."],
	},
};

export default CodeKlash;
