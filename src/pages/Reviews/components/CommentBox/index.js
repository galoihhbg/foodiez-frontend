import { useState } from 'react';
import ModalCarousel from '../../../../components/ModalCarousel';
import RatingStar from '../../../../components/RatingStar';
import styles from './CommentBox.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function CommentBox() {
    const [modalShow, setModalShow] = useState(-1)
    const images = [
        'https://pbs.twimg.com/media/FkuhCgoUEAAPI5q?format=jpg&name=medium',
        'https://preview.redd.it/m3w1ony9v8p81.png?width=640&crop=smart&auto=webp&s=1c9d26d4666bd218361008fa54d03a2311787bcd',
        'https://pbs.twimg.com/media/GR30WR_aAAA4Sb8?format=jpg&name=medium',
        'https://pbs.twimg.com/media/Ef2xZL6UwAE5AI_?format=jpg&name=medium',
        'https://pbs.twimg.com/media/GUIcQ0zasAAdeRe?format=jpg&name=large'
    ]
    return ( 
        <div className={cx('wrapper')}>
            <ModalCarousel 
                show = {modalShow > -1 ? true : false}
                indexState = {modalShow}
                onHide={() => setModalShow(-1)}
                images = {images}
            />
                
            <header className={cx('header')}>
                <img className={cx('user-avatar')} src='https://i2.docln.net/ln/users/avatars/u179165-b669a423-311b-47f6-99c3-012d4d7377a9.jpg' alt='user avatar' />
                <div className={cx('user-info')}>
                    <span className={cx('user-name')}>Bặc Kảy</span>
                    <span className={cx('posted-time')}>1/8/2024 11:39</span>
                    <span className={cx('user-device')}>Via iPhone</span>
                </div>
            </header>

            <body className={cx('body')}>
                <RatingStar data={{score: 4.5, grade: 5}} />
                <h4 className={cx('title')}>
                    Delicious hole in the wall Banh Mi
                </h4>
                <p className={cx('text')}>We came here three times in our four days in Hanoi and tried almost everything on the menu. So nice to find authentic and delicious vegan street food! <br /><br />
                    It‘s hidden away in a tiny alley but not hard to find if you know where to look.
                </p>
                <div className={cx('images')}>
                    {
                        images.map((image, index) => {
                            return <img key={index} onClick={() => setModalShow(index)} alt='restaurant review' className={cx('image')} src={image} />
                        })
                    }
                </div>
            </body>
        </div>
     );
}

export default CommentBox;