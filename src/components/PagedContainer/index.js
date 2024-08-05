import CommentBox from '../../pages/Reviews/components/CommentBox';
import styles from './PagedContainer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function PagedContainer() {
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h3 className={cx('title')}>315 Đánh giá</h3>
                <select name="orderby" className={cx('orderby')} >
                    <option value="updated_date">Mặc Định</option>
                    <option value="date-desc">Mới Nhất</option>
                    <option value="date-asc">Cũ Nhất</option>
                    <option value="rating-desc">Rating Cao Nhất</option>
                    <option value="rating-asc">Rating Thấp Nhất</option>
                </select>
            </header>
            <main className={cx('container')}>
                <CommentBox />
                <CommentBox />
                <CommentBox />
                <CommentBox />
            </main>
        </div>
     );
}

export default PagedContainer;