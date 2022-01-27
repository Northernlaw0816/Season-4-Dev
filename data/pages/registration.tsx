import { ArenaOfValor, KnockOut, TruthOrDebug, LogAndBlog, Designscape, Otakuiz } from "./events"

const Registration = {
	title: "Pre-Registration Information",
	commonRules: [
		"Registrations are open for students from classes 9 to 12.",
		"Participants can register for more than one event.",
	],

	eventRules: [
		{
			title: "Arena Of Valor",
			rules: ArenaOfValor.headings.registration
		},
		{
			title: "Knock Out",
			rules: KnockOut.headings.registration
		},
		{
			title: "Truth Or Debug",
			rules: TruthOrDebug.headings.registration
		},
		{
			title: "Log And Blog",
			rules: LogAndBlog.headings.registration
		},
		{
			title: "Designscape",
			rules: Designscape.headings.registration
		},
		{
			title: "Otakuiz",
			rules: Otakuiz.headings.registration
		}
	]
}

export default Registration