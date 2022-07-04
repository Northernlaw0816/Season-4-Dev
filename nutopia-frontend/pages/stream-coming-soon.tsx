import anime from "animejs"
import Image from "next/image"
import { useEffect } from "react"
import AoV from "../public/images/events/aov_logo.png"
import styles from "../styles/pages/ComingSoon.module.scss"

const StreamComingSoon = () => {

	useEffect(() =>{
		anime({
			targets: [".logo"],
			keyframes: [
				{translateY: 0},
				{translateY: 50},
				{translateY: 0},
			],
			loop: true,
			duration: 4000,
			easing: "easeInOutQuad"
		})
	})

	return (
	<div className={styles.bg}>
		<div className={`${styles.logo} logo`}>
			<Image src={AoV}/>
		</div>
		<h1><span>COMING SOON</span></h1>
	</div>
	)
}

export default StreamComingSoon