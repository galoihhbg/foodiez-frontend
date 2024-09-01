import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RestaurantInfo.module.scss'
import classNames from 'classnames/bind'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles)
function RestaurantInfo({data}) {
    const [isClosed, setClosed] = useState()
    useEffect(() => {
        if (data.info.time_open_shop === 'Cả ngày') {
            setClosed(false)
            return
        }
        const times = data.info.time_open_shop.split(' - ');

        const openingTime = times[0];
        const closingTime = times[1];

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const openingMinutes = parseInt(openingTime.split(':')[0]) * 60 + parseInt(openingTime.split(':')[1]);
        const closingMinutes = parseInt(closingTime.split(':')[0]) * 60 + parseInt(closingTime.split(':')[1]);

        if (currentTime >= openingMinutes && currentTime < closingMinutes) {
            setClosed(false)
        } else {
            setClosed(true)
        }
    }, [data.info.time_open_shop])
    return ( 
        <div className={cx('wrapper')}>
            <div>
                <p className={cx('res-name')}>
                    {data.info.name_shop}
                </p>

                <div className={cx('value')}>
                    <div title={`${data.info.point_overall / 2}/5`} className={cx('stars')}>
                        {
                            [...Array(5).keys()].map((i) => {
                                return <span key={i} style={{backgroundClip:'text', backgroundImage: `linear-gradient(to right, #ffc200 0, #ffc200 ${data.info.point_overall /2 >= (i+1) ? (i+1) * 40 /3 : (data.info.point_overall /2 + 1 - (i+1)) * 40/3}px, #ffffff ${data.info.point_overall /2 >= (i+1) ? (i+1) * 40 /3 : (data.info.point_overall /2 + 1 - (i+1)) * 40/3}px)`}} className={cx('star')}>&#9733;</span>
                            })
                        }
                    </div>

                    <div className={cx('reviews')}>{`(${data.comment})`}</div>
                    <div className={cx('divider-dot')}></div>
                    <div className={cx('saved')}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <span>{data.shop_order}</span>
                    </div>
                    <div className={cx('divider-dot')}></div>
                    <p className={cx('status')}>{isClosed ? 'Đã đóng cửa' : 'Đang mở cửa'}</p>
                    <p>{data.info.time_open_shop}</p>
                </div>

                <div className={cx('images')}>
                    <img className={cx('image')} src={data.src.slice(0, data.src.indexOf('@resize'))} alt={data.info.name_shop} />
                </div>

                <div className={cx('tag-list')}>
                    <Link className={cx('tag-list-item')}>{data.info.type_1_shop}</Link>
                    <Link className={cx('tag-list-item')}>{data.info.type_2_shop}</Link>
                </div>
            </div>
        </div>
     );
}

export default RestaurantInfo;