import { toSlug } from "."
import EventsList from "../data/EventsList"

type FormFields = {
	event: Event | "default-value",
	platform?: string,
	game?: string,
	teamName?: string,
	participants: Participants[]
}

type Participants = {
	name: string,
	grade: string,
	email: string
}

const eventsList: string[] = EventsList.map(event => toSlug(event.title))
const events = [ ...eventsList ] as const
type Event = typeof events[number]

export type { FormFields , Participants, Event }