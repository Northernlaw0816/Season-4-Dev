import { ArenaOfValor, KnockOut, TruthOrDebug, LogAndBlog, Designscape, Otakuiz } from "./events"

const Registration = {
	title: "Pre-Registration Information",
	commonRules: [
		"Registrations are open for students from classes 9 to 12.",
		"Participants can register for only one event. And Optionally can register for each platform of Arena of Valor.",
		"Participants must use the same email-id for all registrations.",
		"Participants that submit mis-matched information will be disqualified."
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