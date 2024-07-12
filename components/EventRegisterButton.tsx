import Link from "next/link";
import Main from "../data/Main";
import { UrlObject } from "url";
import { useRouter } from "next/router";

//stylesheets
import styles from "../styles/pages/Events.module.scss";

declare type Url = string | UrlObject;
/**
 * Registration button on event page to redirect to registration
 * @param event - Event Title to pass as default event value
 */
const EventsRegisterButton = ({ text, game }: { text: string; game?: string }) => {
	const router = useRouter();

	const pathname = `${router.pathname}/register`;

	const href: Url = { pathname };
	if (game) {
		href.query = { game };
	}

	return (
		<div className={styles.register_link_align}>
			{Main.registrationClosingDate.getTime() <= new Date().getTime() ? (
				<a className={styles.register_link}>Registrations opening soon!</a>
			) : (
				<Link href={href} target="_self">
					<a className={styles.register_link}>
						<p>{text}</p>
					</a>
				</Link>
			)}
		</div>
	);
};

export default EventsRegisterButton;
