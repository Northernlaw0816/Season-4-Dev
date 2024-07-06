import { useRouter } from "next/router"
import HeadTemplate from "../../../components/HeadTemplate"
import Layout from "../../../components/Layout"
import RegistrationForm from "../../../components/RegistrationForm"
import styles from "../../../styles/pages/Registration.module.scss"
import EventsList from "../../../data/EventsList";
import ArenaOfValor from "../../../data/pages/events/arena-of-valor"
import { RegistrationData } from "../../../data/pages"

export default function Register() {

	const router = useRouter()
	const eventName = router.query.slug as string
	const game = router.query.game as string

	const Event = EventsList.find((event) => {
		return event.id == eventName
	})

	function findGame(gameId: string) {
		return ArenaOfValor.headings.platforms.find((platform) => {
			return platform.games.find((game) => {
				return game.id === gameId
			})
		})?.games.find((game) => {
			return game.id === gameId
		})?.name
	}


	return <>
		<HeadTemplate title={`NuTopia | Register for ${Event?.title}`} description="Register for event: Arena of Valor"/>

		<Layout overrideClasses={styles.main}>
			<h1>Registration</h1>

			<p id="note" style={{fontSize: "1.5em"}}>NuTopia - Season 4 is open for schools in Coimbatore.</p>
            <p id="note" style={{fontSize: "1.5em"}}>Please read the given guidelines under each event before proceeding to fill the registration form.</p>

            <h2 id="guidelines">Guidelines</h2>
            <ul>
                {RegistrationData.commonRules.map((rule: string, index: number) => <li key={index}><p>{rule}</p></li>)}
            </ul>

			<RegistrationForm event={eventName} title={`${Event?.title}: ${Event?.id==="arena-of-valor" ? findGame(game) : ""}`}/>
		</Layout>
	</>
}