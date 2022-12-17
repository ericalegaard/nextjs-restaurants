import styles from './Col.module.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles);

const Col = ({ children, width }) => {
    let columnClasses = cx({
        col: true,
        [`col-${width}`]: width
    });
    return <div className={columnClasses}>{children}</div>
}
export default Col