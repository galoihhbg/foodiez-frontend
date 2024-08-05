import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RestaurantInfo.module.scss'
import classNames from 'classnames/bind'
import { faBookmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Button from '../../../../components/Button'

const cx = classNames.bind(styles)
function RestaurantInfo() {
    const data = {
        name: 'Nanamine Yuzu',
        score: 4.5,
        reviewCount: 151,
        saved: 984,
        tags: [
            'Sang trọng',
            'Nhà hàng',
            'Pháp',
        ]
    }
    return ( 
        <div className={cx('wrapper')}>
            <div>
                <h1 className={cx('res-name')}>
                    Nanamine Yuzu
                </h1>

                <div className={cx('value')}>
                    <div title={`${data.score}/5`} className={cx('stars')}>
                        {
                            [...Array(5).keys()].map((i) => {
                                return <span key={i} style={{backgroundClip:'text', backgroundImage: `linear-gradient(to right, #ffc200 0, #ffc200 ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px, #ffffff ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px)`}} className={cx('star')}>&#9733;</span>
                            })
                        }
                    </div>

                    <div className={cx('reviews')}>{`(${data.reviewCount})`}</div>
                    <div className={cx('divider-dot')}></div>
                    <div className={cx('saved')}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <span>{data.saved}</span>
                    </div>
                    <div className={cx('divider-dot')}></div>
                    <p className={cx('status')}>Đang mở cửa</p>
                    <p>06:30 - 22:30</p>
                </div>

                <div className={cx('images')}>
                    <div className={cx('container')}>
                        <div className={cx('medium-ui')}>
                            <img className={cx('image')} src='https://pbs.twimg.com/media/GCMCy6wa8AAi0xN?format=jpg&name=medium' alt={data.name} />
                            <div className={cx('small-ui')}>
                                <img className={cx('image')} src='https://pbs.twimg.com/media/GCMCy6wa8AAi0xN?format=jpg&name=medium' alt={data.name} />
                                <img className={cx('image')} src='https://pbs.twimg.com/media/GCMCy6wa8AAi0xN?format=jpg&name=medium' alt={data.name} />
                            </div>
                        </div>
                        <div className={cx('large-ui')}>
                            <img className={cx('image')} src='https://pbs.twimg.com/media/GCMCy6wa8AAi0xN?format=jpg&name=medium' alt={data.name} />
                            <img className={cx('image')} src='https://pbs.twimg.com/media/GCMCy6wa8AAi0xN?format=jpg&name=medium' alt={data.name} />
                        </div>
                    </div>

                    <div className={cx('btn-view-all')}>
                        <Button bgFill medium classnames={['reviews-images--view-all']} leftIcon={<FontAwesomeIcon icon={faCamera} />}>Xem tất cả</Button>
                    </div>
                </div>

                <div className={cx('tag-list')}>
                    {
                        data.tags.map((tag, index) => {
                            return <Link key={index} className={cx('tag-list-item')}>{tag}</Link>
                        })
                    }
                </div>
            </div>
        </div>
     );
}

export default RestaurantInfo;