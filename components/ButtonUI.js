import classnames from 'classnames/bind'
import Icon from './Icon'
import styles from './ButtonUI.module.scss'

let cx = classnames.bind(styles)

const ButtonUI = ({ clickHandler, icon }) => {
    let buttonClasses = cx({ 
        buttonUI : true, 
        close : icon === "close"
    });
    return <button className={buttonClasses} onClick={clickHandler}>
        <Icon slug={icon} />
    </button>
}
export default ButtonUI