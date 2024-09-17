import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import images from '../../../../assets/images';
import config from '../../../../config';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import publicData from '../../../../assets/data';

const cx = classNames.bind(styles)
function Header() {
    const navigate = useNavigate()
    const {city} = useParams()
    const [currentCity, setCurrentCity] = useState(city || 'ho-chi-minh')
    const [toggled, setToggled] = useState(false)
    const [clientWidth, setClientWidth] = useState(window.innerWidth)
    const [modalShow, setModalShow] = useState(false)
    const handleClick = () => {
        setToggled(!toggled)
    }

    const handleChangeCity = (city) => {
        setCurrentCity(city)
        setModalShow(false)
        navigate(config.routes.home.replace(':city', city))
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
            <Modal
                  show = {modalShow}
                  onHide={() => setModalShow(false)}
                  size="md"
                  dialogClassName="modal-100w"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            >
                  <Modal.Body>
                    <div className={cx('container')}>
                        {
                            Object.keys(publicData.cities).map(key => {
                                return <div key={key}>
                                        <Button onClick={() => handleChangeCity(key)} medium bgFill>{publicData.cities[key]}</Button>
                                    </div>
                            })
                        }
                    </div>
                  </Modal.Body>
            </Modal>
            <div className={cx('logo-area')}>
                <button onClick={(e) => handleClick()} className={cx('toggle-button')}>{<FontAwesomeIcon icon={faBars} />}</button>
                <Link to={config.routes.home.replace(':city', currentCity)}>
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
                            <Link to={config.routes.list.replace(':city', currentCity) + '?orderby=date-desc'} className={cx('menu-item')}>Mới Nhất</Link>
                            <Link to={config.routes.list.replace(':city', currentCity) + '?orderby=rating-desc'} className={cx('menu-item')}>Điểm Cao Nhất</Link>
                            <Link to={config.routes.list.replace(':city', currentCity) + '?orderby=review-desc'} className={cx('menu-item')}>Nhiều Review Nhất</Link>
                        </div>
                    </div>
                    <Link className={cx('nav-item')}>Shopee Food</Link>
                    <Link className={cx('nav-item')}>Ứng Dụng</Link>
                </div>

                <div className={cx('right')}>
                    <Button to={config.routes.search.replace(':city', currentCity)} medium onlyIcon classnames={'search-button-on-header'}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</Button>
                    <Button medium outline classnames={'language-button-on-header'}>Ngôn Ngữ</Button>
                    <Button onClick={(e) => setModalShow(true)} medium bgFill classnames={'login-button-on-header'}>{publicData.cities[currentCity]}</Button>
                </div>
            </div>
        </header>
     );
}

export default Header;