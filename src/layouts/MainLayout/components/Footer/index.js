import styles from './Footer.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p>Contact for work, copyright, and more:</p>
                <Link className={cx('contact-mail')}>21021535@vnu.edu.vn</Link>
                <div className={cx('nav')}>
                    <Link className={cx('item')}>Chính sách bảo mật</Link>
                    <Link className={cx('item')}>Điều khoản sử dụng</Link>
                </div>
            </div>

            <p className={cx('text')}>
                All Contents Copyright © 2024-now Fuddee's Healthy Eating Guide
            </p>
        </div>
     );
}

export default Footer;