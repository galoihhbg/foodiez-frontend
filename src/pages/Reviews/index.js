import CommentArea from './components/CommentArea';
import Detail from './components/Detail';
import RestaurantInfo from './components/RestaurantInfo';
import styles from './Reviews.module.scss'
import classNames from 'classnames/bind'

import styles2 from './Grid.module.scss'

const cx = classNames.bind(styles)
const cx2 = classNames.bind(styles2)
function Reviews() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={`${cx2('grid')} ${cx('container')}`}>
                <div className={cx2('row', 'no-margins')}>
                    <div className={`${cx2('col', 'st-12', 't-7', 'm-8', 'l-8')} ${cx('main-venue')}`}>
                        <RestaurantInfo />
                    </div>

                    <div className={`${cx2('col', 'st-12', 't-5', 'm-4', 'l-4')} ${cx('detail-info')}`}>
                        
                        <Detail />
                    </div>

                    <div className={`${cx2('col', 'st-12', 't-7', 'm-8', 'l-8')} ${cx('comment-area')}`}>
                        <CommentArea />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Reviews;