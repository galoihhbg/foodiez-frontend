import styles from './CommentArea.module.scss'
import classNames from 'classnames/bind'

import RatingBar from '../../../../components/RatingBar';
import RatingStar from '../../../../components/RatingStar';
import PagedContainer from '../../../../components/PagedContainer';

const cx = classNames.bind(styles)
function CommentArea() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('rating')}>
                <div className={cx('total')}>
                    <span className={cx('score')}>4.5 / 5</span>
                    <RatingStar data={{score: 4.5, grade: 5}} />
                    <span className={cx('total-reviews')}>{`(1200 đánh giá)`}</span>
                </div>
                <div className={cx('list')}>
                    <div className={cx('list-item')}>
                        <span className={cx('aspect')}>Vị trí</span>
                        <RatingBar data={{point: 4.5, grade: 5}} />
                    </div>
                    <div className={cx('list-item')}>
                        <span className={cx('aspect')}>Giá cả</span>
                        <RatingBar data={{point: 2, grade: 5}} />
                    </div>
                    <div className={cx('list-item')}>
                        <span className={cx('aspect')}>Chất lượng</span>
                        <RatingBar data={{point: 3.5, grade: 5}} />
                    </div>
                    <div className={cx('list-item')}>
                        <span className={cx('aspect')}>Phục vụ</span>
                        <RatingBar data={{point: 5, grade: 5}} />
                    </div>
                    <div className={cx('list-item')}>
                        <span className={cx('aspect')}>Không gian</span>
                        <RatingBar data={{point: 4, grade: 5}} />
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <PagedContainer />
            </div>
        </div>
     );
}

export default CommentArea;