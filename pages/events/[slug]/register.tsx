import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import HeadTemplate from "../../../components/HeadTemplate";
import Layout from "../../../components/Layout";
import RegistrationForm from "../../../components/RegistrationForm";
import styles from "../../../styles/pages/Registration.module.scss";
import EventsList from "../../../data/EventsList";
import { toSlug } from "../../../functions";
import {
	ArenaOfValor,
	CodeKlash,
	Designscape,
	KnockOut,
	LogAndBlog,
	Otakuiz,
	Pitstop,
	TruthOrDebug,
} from "../../../data/pages/events";
import { RegistrationData } from "../../../data/pages";

export default function Register() {
	const router = useRouter();
	const eventId = router.query.slug as string;
	const game = router.query.game as string;

	const Event = EventsList.find((event) => {
		return event.id == eventId;
	});

	function findGame(gameId: string) {
		return ArenaOfValor.headings.platforms
			.find((platform) => {
				return platform.games.find((game) => {
					return game.id === gameId;
				});
			})
			?.games.find((game) => {
				return game.id === gameId;
			});
	}
	if (eventId === "arena-of-valor") {
		const EventPageURL = router.pathname.replace("[slug]", eventId).replace("register", "");

		if (!findGame(game)) {
			router.replace(EventPageURL);
			router.reload();
		}
	}
	return (
		<>
			<HeadTemplate title={`NuTopia | Register for ${Event?.title}`} description="Register for event: Arena of Valor" />

			<Layout overrideClasses={styles.main}>
				<h1>Registration</h1>
				<p id="note" style={{ fontSize: "1.5em" }}>
					NuTopia - Season 4 is open for schools in Coimbatore.
				</p>
				<p id="note" style={{ fontSize: "1.5em" }}>
					Please read the given guidelines under each event before proceeding to fill the registration form.
				</p>
				<h2 id="guidelines">Guidelines</h2>
				<ul>
					{RegistrationData.commonRules.map((rule: string | ReactNode, index: number) => {
						if (typeof rule === "string")
							return (
								<li key={index}>
									<p>{rule}</p>
								</li>
							);
						return <div className={styles.info_image} key={index}>{rule}</div>;
					})}
				</ul>
				{eventId === ArenaOfValor.id && (
					<>
						<h2 id="guidelines">Event Common Guidelines</h2>
						<ul>
							{ArenaOfValor.headings.commonGuidelines.map((rule: any, index: number) => {
								if (typeof rule === "object") {
									return (
										<li key={index}>
											<p>
												{rule[0]}
												<ul>
													{rule.map((subrule: any, index: number) => {
														return (
															index > 0 && (
																<li key={index}>
																	<p>{subrule}</p>
																</li>
															)
														);
													})}
												</ul>
											</p>
										</li>
									);
								}
								return (
									<li key={index}>
										<p>{rule}</p>
									</li>
								);
							})}
						</ul>
						<h2 id="guidelines">Event Guidelines</h2>
						{[findGame(game)].map((game: any, index: number) => {
							return (
								<div key={index}>
									<h3 id={toSlug(`game ${game.name}`)}>{game.name}</h3>
									<div
										className={styles.game_logo}
										style={{ backgroundImage: `url(/images/events/aov_games/${game.image})` }}></div>
									<h4 id={toSlug(`${game.name} details`)}>Details</h4>
									<p className={styles.h4_p}>Team Size: {game.participants}</p>
									<h4 id={toSlug(`${game.name} guidelines`)}>Guidelines</h4>
									<ul className={styles.h4_p}>
										{game.guidelines.map((rule: any, index: number) => {
											if (typeof rule === "object") {
												return (
													<li key={index}>
														<p>
															{rule[0]}
															<ul>
																{rule.map((subrule: any, index: number) => {
																	return (
																		index > 0 && (
																			<li key={index}>
																				<p>{subrule}</p>
																			</li>
																		)
																	);
																})}
															</ul>
														</p>
													</li>
												);
											}
											return (
												<li key={index}>
													<p>{rule}</p>
												</li>
											);
										})}
									</ul>
								</div>
							);
						})}
					</>
				)}
				{eventId === KnockOut.id && (
					<>
						<h2 id="guidelines">Event Guidelines</h2>
						{KnockOut.headings.guidelines.map((round: { title: string; rules: string[] }, index) => {
							return (
								<div key={index}>
									<p className={styles.h2_p}>
										<strong>{round.title}</strong>
									</p>
									<ul className={styles.h2_p}>
										{round.rules.map((rule: string, index) => {
											return (
												<li key={index}>
													<p>{rule}</p>
												</li>
											);
										})}
									</ul>
								</div>
							);
						})}
					</>
				)}
				{[CodeKlash, Designscape, LogAndBlog, Otakuiz, Pitstop, TruthOrDebug].find((event) => event.id === eventId) && (
					<>
						<h2 id="guidelines">Event Guidelines</h2>
						<ul>
							{[CodeKlash, Designscape, LogAndBlog, Otakuiz, Pitstop, TruthOrDebug]
								.find((event) => event.id === eventId)
								?.headings.rules.map((rule, index) => {
									if (typeof rule === "object") {
										return (
											<li key={index}>
												{rule[0]}
												<ul>
													{rule.map((subrule, index) => {
														return (
															index > 0 && (
																<li key={index}>
																	<p>{subrule}</p>
																</li>
															)
														);
													})}
												</ul>
											</li>
										);
									}
									return (
										<li key={index}>
											<p>{rule}</p>
										</li>
									);
								})}
						</ul>
					</>
				)}

				<RegistrationForm
					eventName={eventId}
					title={`${Event?.title}: ${Event?.id === "arena-of-valor" ? findGame(game)?.name : ""}`}
				/>
			</Layout>
		</>
	);
}
