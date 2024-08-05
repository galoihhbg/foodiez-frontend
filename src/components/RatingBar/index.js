import styles from './RatingBar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function RatingBar({data}) {
    return ( 
        <div className={cx('wrapper')}>
            <div style={{background: `linear-gradient(to right, rgb(${255 - 179 / data.grade * data.point}, ${175 / data.grade * data.point}, 80) 0px, rgb(${255 - 179 / data.grade * data.point}, ${175 / data.grade * data.point}, 80) ${data.point * 100 / data.grade}%, white ${data.point * 100 / data.grade}%, white 100%)`}} className={cx('bar')}></div>
            <span className={cx('points')}>{`${data.point}/${data.grade}`}</span>
        </div>
     );
}

export default RatingBar;