import styles from './Rating.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function RatingStar({data}) {
    return (
        <div className={cx('wrapper')}>
            <div title={`${data.score}/${data.grade}`} className={cx('stars')}>
                {
                    [...Array(data.grade).keys()].map((i) => {
                        return <span key={i} style={{backgroundClip:'text', backgroundImage: `linear-gradient(to right, #ffc200 0, #ffc200 ${data.score >= (i+1) ? 100 : (data.score + 1 - (i+1)) *100}%, #ffffff ${data.score >= (i+1) ? 100 : (data.score + 1 - (i+1)) * 100}%)`}} className={cx('star')}>&#9733;</span>
                    })
                }
            </div>
        </div>
     );
}

export default RatingStar;