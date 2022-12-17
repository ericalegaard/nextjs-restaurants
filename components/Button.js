import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import Link from 'next/link'

let cx = classnames.bind(styles);

const Button = ({
    label = "label goes here",
    clickHandler, 
    path
}) => {
    return path ? 
    <Link href={path} className={styles.btn}>
        {label}
    </Link> 
    : 
    <button className={styles.btn} onClick={clickHandler}>{label}</button>
}
export default Button