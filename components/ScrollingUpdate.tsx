import styles from "../styles/components/ScrollingUpdate.module.scss"

const ScrollingUpdate = ({message}: {message: string}) => {
	return (
		message !== "" ? <div className={styles.scrolling_bg}>
			<div className={styles.scrolling_text}><p>{message}</p><p>{message}</p></div>
		</div> : 
		<></>
	)
}

export default ScrollingUpdate