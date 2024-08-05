import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Detail.module.scss'
import classNames from 'classnames/bind'
import { faDollarSign, faLink, faLocationDot, faPhone, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCircleCheck, faClock } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Accordion from '../../../../components/Accordion';

const cx = classNames.bind(styles)
function Detail() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
               <Link className={cx('nav-item', 'highlight', 'mobile-show')}>
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faLink} />
                  <span>Website</span>
               </Link>
               <Link className={cx('nav-item', 'highlight', 'mobile-show')}>
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faFacebookF} />
                  <span>Facebook</span>
               </Link>
               <Link className={cx('nav-item', 'highlight')}>
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faShareNodes} />
                  <span>Chia sẻ</span>
               </Link>
               <Link className={cx('nav-item', 'highlight')}>
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faBookmark} />
                  <span>Theo dõi</span>
               </Link>
            </div>
           <img className={cx('map')} src='https://static.zerochan.net/Otonari.no.Tenshi-sama.ni.Itsuno.Manika.Dame.Ningen.ni.Sareteita.full.3898954.jpg' alt='map' />
           <div className={cx('list')}>
               <div className={cx('list-item', 'location')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faLocationDot} />
                  <span>144 Xuân Thủy, Cầu Giấy, Hà Nội</span>
               </div>

               <div className={cx('list-item', 'cost')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faDollarSign} />
                  <span className={cx('highlight')}>20000đ - 300000đ</span>
               </div>

               <div className={cx('list-item', 'phone')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faPhone} />
                  <span className={cx('highlight')}>0325960657</span>
               </div>

               <div className={cx('list-item', 'open-time')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faClock} />
                  <Accordion show={1}>
                     <p>
                        <span>Hôm nay</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p style={{marginTop: 10}}>
                        <span>Thứ Hai</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p>
                        <span>Thứ Ba</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p>
                        <span>Thứ Tư</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p>
                        <span>Thứ Năm</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p>
                        <span>Thứ Sáu</span>
                        <span>06:00 - 23:30</span>
                     </p>
                     <p>
                        <span>Chủ Nhật</span>
                        <span>06:00 - 23:30</span>
                     </p>
                  </Accordion>
               </div>

               <div className={cx('list-item', 'mobile-hidden')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faLink} />
                  <span className={cx('highlight')}>nhentaiii.net</span>
               </div>

               <div className={cx('list-item', 'mobile-hidden')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faFacebookF} />
                  <span className={cx('highlight')}>Facebook</span>
               </div>

               <hr className={cx('list-item', 'divider')} />

               <Accordion show={3} ml={35} mt={0}> 
                  <div className={cx('list-item', 'insta')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Có mang về</span>
                  </div>

                  <div className={cx('list-item', 'plus-points')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Thanh toán bằng thẻ</span>
                  </div>

                  <div className={cx('list-item', 'plus-points')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Wifi</span>
                  </div>

                  <div className={cx('list-item', 'insta')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Có mang về</span>
                  </div>

                  <div className={cx('list-item', 'plus-points')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Thanh toán bằng thẻ</span>
                  </div>

                  <div className={cx('list-item', 'plus-points')}>
                     <FontAwesomeIcon className={cx('list-item_icon')} icon={faCircleCheck} />
                     <span>Wifi</span>
                  </div>
               </Accordion>

           </div>
        </div>
     );
}

export default Detail;