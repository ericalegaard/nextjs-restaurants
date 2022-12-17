import styles from './Label.module.scss'

const Label = ({children}) => {
    return <label className={styles.label}>{children}</label>
}
export default Label