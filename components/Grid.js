import styles from './Grid.module.scss'
import Card from './Card'

const Grid = ({ data }) => {
    return <div className={styles.grid}>
        {data.map((restaurant, index) => {
            return <Card key={index} data={restaurant.node} />
        })}
    </div>
}
export default Grid