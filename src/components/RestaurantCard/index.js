import { Link } from 'react-router-dom';
import styles from './RestaurantCard.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMugSaucer } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function RestaurantCard({data}) {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.image} alt='restaurant view' />
            <div className={cx('name-section')}>
                <FontAwesomeIcon style={{color: data.type === 'food' ? 'green' : 'red'}} className={cx('icon')} icon={data.type === 'food' ? faBowlFood : faMugSaucer} />
                <Link title={data.name} className={cx('name')}>{data.name}</Link>
            </div>
            <span title={data.address} className={cx('address')}>{data.address}</span>
            <div className={cx('value')}>
                <div title={`${data.score}/5`} className={cx('stars')}>
                    {
                        [...Array(5).keys()].map((i) => {
                            return <span key={i} style={{backgroundClip:'text', backgroundImage: `linear-gradient(to right, #ffc200 0, #ffc200 ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px, #ffffff ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px)`}} className={cx('star')}>&#9733;</span>
                        })
                    }
                </div>

                <span className={cx('reviews')}>{`${data.reviewCount} đánh giá`}</span>
            </div>
            <p title={data.description} className={cx('description')}>
                <span>{data.description}</span>
            </p>
        </div>
     );
}

export default RestaurantCard;