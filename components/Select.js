import styles from './Select.module.scss'

const Select = ({ options, changeHandler }) => {
    return <select className={styles.select} onChange={(event) => {
        changeHandler(event.target.value);
    }}>
        <option value="All">All</option>
        {options.map(( option, index ) => {
            return <option key={index} value={option}>{option}</option>
        })}
    </select>
}
export default Select