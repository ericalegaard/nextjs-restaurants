import classNames from 'classnames/bind'
import styles from './Heading.module.scss';

let cx = classNames.bind(styles);

const Heading = ({ children, level, marginBottom, marginTop }) => {
	const Tag = level > 6 ? 'h6' : `h${level}`

	let headingClasses = cx({
		heading: true,
		[`${Tag}`]: level,
        [`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-top-${marginTop}`]: marginTop
	});

	return <Tag className={`${headingClasses}`}>{children}</Tag>
}
export default Heading