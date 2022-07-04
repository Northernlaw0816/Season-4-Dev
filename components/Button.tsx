import Link from "next/link";

import Effects from '../styles/Effects.module.scss'
import styles from '../styles/components/Button.module.scss'

const Button = ({text, children, href, onClick}: {text?: string, children?: any, href?: string, onClick?: any}) => {
	return(
		<Link href={href ? href : ""}><a className={`${styles.button}` /* ${Effects.button_hover_effect}` */} onClick={onClick}>{children ? children : text}</a></Link>
	)
}

export default Button