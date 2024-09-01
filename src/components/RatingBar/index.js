import styles from './RatingBar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function RatingBar({data}) {
    const stData = {
        point: Number.isNaN(data.point) ? 0 : data.point,
        grade: data.grade
    }

    return ( 
        <div className={cx('wrapper')}>
            <div style={{background: `linear-gradient(to right, rgb(${255 - 179 / stData.grade * stData.point}, ${175 / stData.grade * stData.point}, 80) 0px, rgb(${255 - 179 / stData.grade * stData.point}, ${175 / stData.grade * stData.point}, 80) ${stData.point * 100 / stData.grade}%, white ${stData.point * 100 / stData.grade}%, white 100%)`}} className={cx('bar')}></div>
            <span className={cx('points')}>{`${Number.isNaN(data.point) ? 'null' : data.point}/${stData.grade}`}</span>
        </div>
     );
}

export default RatingBar;