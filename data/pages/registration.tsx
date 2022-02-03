import { ArenaOfValor, KnockOut, TruthOrDebug, LogAndBlog, Designscape, Otakuiz } from "./events"

const Registration = {
	title: "Pre-Registration Information",
	commonRules: [
		"Registrations are open for students from classes 9 to 12.",
		"Participants can register for only one event.",
	],

	eventRules: [
		{
			title: ArenaOfValor.title,
			rules: ArenaOfValor.headings.registration
		},
		{
			title: KnockOut.title,
			rules: KnockOut.headings.registration
		},
		{
			title: TruthOrDebug.title,
			rules: TruthOrDebug.headings.registration
		},
		{
			title: LogAndBlog.title,
			rules: LogAndBlog.headings.registration
		},
		{
			title: Designscape.title,
			rules: Designscape.headings.registration
		},
		{
			title: Otakuiz.title,
			rules: Otakuiz.headings.registration
		}
	]
}

export default Registration