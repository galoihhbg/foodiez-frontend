import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import images from '../../../../assets/images';
import config from '../../../../config';

const cx = classNames.bind(styles)
function Header() {
    const [toggled, setToggled] = useState(false)
    const [clientWidth, setClientWidth] = useState(window.innerWidth)
    const handleClick = () => {
        setToggled(!toggled)
    }

    useEffect(() => {
        const handleResize = () => {
            setClientWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('logo-area')}>
                <button onClick={(e) => handleClick()} className={cx('toggle-button')}>{<FontAwesomeIcon icon={faBars} />}</button>
                <Link to={config.routes.home}>
                    <img className={cx('logo')} alt='fudi logo' src={images.logo} />
                </Link>
            </div>
            <div className={cx('mobile-nav')}>
                <Button medium onlyIcon classnames={'mobile-search-button-on-header'}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</Button>
                <Button medium bgFill>Đăng Nhập</Button>
            </div>
            <div style={{display: clientWidth >= 1200 || toggled ? 'flex' : 'none'}} className={cx('nav')}>
                <div className={cx('left')}>
                    <div className={cx('nav-item', 'dropdown')}>
                        <span>Khám Phá</span>
                        <div className={cx('dropdown-menu')}>
                            <Link to={config.routes.list.replace(':city', 'ho-chi-minh') + '?orderby=date-desc'} className={cx('menu-item')}>Mới Nhất</Link>
                            <Link to={config.routes.list.replace(':city', 'ho-chi-minh') + '?orderby=rating-desc'} className={cx('menu-item')}>Điểm Cao Nhất</Link>
                            <Link to={config.routes.list.replace(':city', 'ho-chi-minh') + '?orderby=review-desc'} className={cx('menu-item')}>Nhiều Review Nhất</Link>
                        </div>
                    </div>
                    <Link className={cx('nav-item')}>Shopee Food</Link>
                    <Link className={cx('nav-item')}>Ứng Dụng</Link>
                </div>

                <div className={cx('right')}>
                    <Button medium onlyIcon classnames={'search-button-on-header'}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</Button>
                    <Button medium outline classnames={'language-button-on-header'}>Ngôn Ngữ</Button>
                    <Button medium bgFill classnames={'login-button-on-header'}>Đăng Nhập</Button>
                </div>
            </div>
        </header>
     );
}

export default Header;