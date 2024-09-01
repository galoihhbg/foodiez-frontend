import styles from './CommentItem.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faMugSaucer } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function CommentItem({data}) {
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('user')}>
                    <img className={cx('user-avatar')} src='https://i.docln.net/lightnovel/users/ua91408-72176e27-5e1c-4c76-9d36-36034335c352.jpg' alt='user avatar' />
                    <div className={cx('user-info')}>
                        <p className={cx('user-name')}>Galoihhbg</p>
                        <span>Đã để lại một đánh giá</span>
                    </div>
                </div>
                <span className={cx('time')}>2 phút trước</span>
            </header>
            {
                data.image ? <Link className={cx('comment-image')} >
                <img src={data.image} alt={data.name} />
            </Link> : <hr className={cx('divider')} />
            }
            
            <main className={cx('main')}>
                <div className={cx('name-section')}>
                    <FontAwesomeIcon style={{color: data.type === 'food' ? 'green' : 'red'}} className={cx('icon')} icon={data.type === 'food' ? faBowlFood : faMugSaucer} />
                    <Link title={data.name} className={cx('name')}>{data.name}</Link>
                </div>
                <span title={data.address} className={cx('address')}>{data.address}</span>
                <div className={cx('value')}>
                    <div title={`${data.score}/5`} className={cx('stars')}>
                        {
                            [...Array(5).keys()].map((i) => {
                                return <span key={i} style={{backgroundClip:'text', backgroundImage: `linear-gradient(to right, #ffc200 0, #ffc200 ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px, #ffffff ${data.score >= (i+1) ? (i+1) * 40 /3 : (data.score + 1 - (i+1)) * 40/3}px)`}} className={cx('star')}>&#9733;</span>
                            })
                        }
                    </div>
                </div>
                <p title={data.title} className={cx('comment-title')}>
                    <span>{data.title}</span>
                </p>
                <p style={{WebkitLineClamp: data.image === '' ? 7 : 2}} className={cx('comment-content')}>
                    Món ăn ở đây gây ấn tượng với mình vì chất lượng ngon, không gian khá đẹp và phục vụ nhiệt tình. Đầu tiên là món bò Wagyu ngon đỉnh, cả gia đình mình đều đánh giá là ngon nhất trong tất cả các nhà hàng đã ăn ở Hà Nội. Sau đó là món gan ngỗng tan trong miệng. Món cá tuyết mẹ chồng mình rất thích. Súp cua hoàng đế đặc sánh rất thơm và có 1 lớp bánh bên trên. Tuy nhiên món cá bơn hơi bị khô 1 chút và đĩa salad thì mình không ấn tượng lắm. Nhưng về tổng thể đồ ăn rất ngon và vừa miệng, phục vụ chuyên nghiệp.
                    Gia đình mình đi 6 người hết tổng 18 triệu.
                </p>
            </main>
        </div>
     );
}

export default CommentItem;