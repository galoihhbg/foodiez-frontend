import { useState } from 'react';
import ModalCarousel from '../../../../components/ModalCarousel';
import RatingStar from '../../../../components/RatingStar';
import styles from './CommentBox.module.scss'
import classNames from 'classnames/bind'
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import RatingBar from '../../../../components/RatingBar';

const cx = classNames.bind(styles)
function CommentBox({data, filtered, title}) {
    const [modalShow, setModalShow] = useState(-1)
    const [ratingShow, setRatingShow] = useState(false)
    const aspectTrans = {
        'Chất lượng' : 'QUALITY',
        'Giá cả' : 'PRICES',
        'Phục vụ':'SERVICE',
        'Không gian':'AMBIENCE',
        'Vị trí':'LOCATION'
    }
    return ( 
        <div className={cx('wrapper')}>
            <ModalCarousel 
                show = {modalShow > -1 ? true : false}
                indexState = {modalShow}
                onHide={() => setModalShow(-1)}
                images = {data.user_imgReview.map((img) => Object.values(img)[0])}
            />
                
            <header className={cx('header')}>
                <img className={cx('user-avatar')} src={data.user_avatar} alt={data.user_name} />
                <div className={cx('user-info')}>
                    <span className={cx('user-name')}>{data.user_name}</span>
                    <span className={cx('posted-time')}>{data.user_timec.replace('T', ' ').replace(/-/g, '/')}</span>
                    <span className={cx('user-device')}>Đã bình luận</span>
                </div>
            </header>

            <div className={cx('body')}>
                <div className={cx('rating')}>
                    <RatingStar data={{score: data.user_rating / 2, grade: 5}} />
                    <div className={cx('btn-detail')}>
                        <Button onClick={() => {setRatingShow(!ratingShow)}} medium rightIcon={<FontAwesomeIcon icon={ratingShow ? faChevronUp : faChevronDown} />}>
                            Chi tiết
                        </Button>
                    </div>
                </div>
                <div style={{display: !ratingShow ? 'none' : ''}} className={cx('rating-detail')}>
                    <div className={cx('list')}>
                        <span className={cx('list-name')}>Trước khi lọc</span>
                        {
                            data.user_tbscore.map((aspect, index) => {
                                return <div key={index} className={cx('list-item')}>
                                    <span className={cx('aspect')}>{Object.keys(aspect)[0]}</span>
                                    <RatingBar data={{point: Object.values(aspect)[0] / 2, grade: 5}} />
                                </div>
                            })
                        }
                    </div>

                    <div className={cx('list')}>
                    <span className={cx('list-name')}>Sau khi lọc</span>
                        { filtered ? 
                            data.user_tbscore.map((aspect, index) => {
                                return <div key={index} style={{opacity: !filtered.includes(aspectTrans[Object.keys(aspect)[0]]) ? 0.5 : 1, fontStyle: !filtered.includes(aspectTrans[Object.keys(aspect)[0]]) ? 'italic': ''}} className={cx('list-item')}>
                                    <span className={cx('aspect')}>{Object.keys(aspect)[0]}</span>
                                    <RatingBar data={{point: Object.values(aspect)[0] / 2, grade: 5}} />
                                </div>
                            }) : ''
                        }
                    </div>
                </div>
                <h4 className={cx('title')}>
                    {title}
                </h4>
                <p className={cx('text')}> {data.user_comment}
                </p>
                <div className={cx('images')}>
                    {
                        data.user_imgReview.map((image, index) => {
                            return <img key={index} onClick={() => setModalShow(index)} alt='restaurant review' className={cx('image')} src={Object.values(image)[0]} />
                        })
                    }
                </div>
            </div>
        </div>
     );
}

export default CommentBox;