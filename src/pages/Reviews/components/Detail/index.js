import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import { faCodeCompare, faDollarSign, faLink, faLocationDot, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faClock } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

Chart.register(ArcElement, Tooltip, Legend);

const cx = classNames.bind(styles);

function Detail({ data }) {
   const [modalShow, setModalShow] = useState(false)
   const sampleData1 = {
      labels: ["Đã lọc", "Chưa lọc"],
      datasets: [
          {
              label: "Số comment",
              data: [9, 5],
              backgroundColor: ["#7c4ec4", "#ffc200"],
          }
      ]
   };

   const sampleData2 = {
      labels: ["Khen", "Chê", "Chưa rõ"],
      datasets: [
          {
              label: "Số comment",
              data: [10, 2, 2],
              backgroundColor: ["#7c4ec4", "#ffc200", "#fd267a"],
          }
      ]
   };

   const options = {
      plugins: {
         legend: {
            display: true,
            position: 'bottom',
         },
      },
   };

   return (
        <div className={cx('wrapper')}>
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
                        <div className={cx('chart')}>
                           <p>Số đánh giá đã lọc</p>
                           <Pie data={sampleData1} options={options} />
                        </div>

                        <div className={cx('chart')}>
                           <p>Phân loại các đánh giá</p>
                           <Pie data={sampleData2} options={options} />
                        </div>
                     </div>
                  </Modal.Body>
            </Modal>
            <div className={cx('navbar')}>
               <Link className={cx('nav-item', 'highlight', 'mobile-show')} aria-label="Link to Foody">
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faLink} />
                  <span>Foody</span>
               </Link>
               <Link onClick={() => setModalShow(true)} className={cx('nav-item', 'highlight')} aria-label="Analysis">
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faCodeCompare} />
                  <span>Phân tích</span>
               </Link>
               <Link className={cx('nav-item', 'highlight')} aria-label="Share">
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faShareNodes} />
                  <span>Chia sẻ</span>
               </Link>
               <Link className={cx('nav-item', 'highlight')} aria-label="Bookmark">
                  <FontAwesomeIcon className={cx('nav-item_icon')} icon={faBookmark} />
                  <span>Theo dõi</span>
               </Link>
            </div>
           <img className={cx('map')} src='https://ietresearch.onlinelibrary.wiley.com/cms/asset/333d1597-cc58-40c4-b535-0b36f3bbea62/wss2bf00262-fig-0010-m.jpg' alt='Map of the location' />
           <div className={cx('list')}>
               <div className={cx('list-item', 'location')}>
                  <div className={cx('list-item_icon')}>
                     <FontAwesomeIcon style={{marginLeft: 4}} icon={faLocationDot} />
                  </div>
                  <span title={data.address}>{data.address}</span>
               </div>

               <div className={cx('list-item', 'cost')}>
                  <div className={cx('list-item_icon')}>
                     <FontAwesomeIcon icon={faDollarSign} />
                  </div>
                  <span title={data.info.price_avg_shop} className={cx('highlight')}>{data.info.price_avg_shop}</span>
               </div>

               <div className={cx('list-item')}>
                  <div className={cx('list-item_icon')}>
                     <FontAwesomeIcon icon={faClock} />
                  </div>
                  <span title={data.info.time_open_shop}>{data.info.time_open_shop}</span>
               </div>

               <div className={cx('list-item', 'mobile-hidden')}>
                  <FontAwesomeIcon className={cx('list-item_icon')} icon={faLink} />
                  <span className={cx('highlight')}>{data.href}</span>
               </div>
           </div>
           <div>
           </div>
        </div>
     );
}

Detail.propTypes = {
   data: PropTypes.shape({
      address: PropTypes.string.isRequired,
      info: PropTypes.shape({
         price_avg_shop: PropTypes.string.isRequired,
         time_open_shop: PropTypes.string.isRequired,
      }).isRequired,
      href: PropTypes.string.isRequired,
   }).isRequired,
};

export default Detail;
