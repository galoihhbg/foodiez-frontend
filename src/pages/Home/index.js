import styles from './Home.module.scss'
import classNames from 'classnames/bind';
import Search from './components/Search';
import Container from '../../components/Popper/Container';
import CommentItem from '../../components/CommentItem';

const cx = classNames.bind(styles)
function Home() {
    const restaurants = [
        {
            image: 'https://s1.zerochan.net/Sakayanagi.Arisu.600.3582003.jpg',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 2.5,
            reviewCount: 2,
            description: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {
            image: 'https://s1.zerochan.net/Sakayanagi.Arisu.600.3582003.jpg',
            type: 'drink',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 4,
            reviewCount: 2,
            description: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {
            image: 'https://s1.zerochan.net/Sakayanagi.Arisu.600.3582003.jpg',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 3.2,
            reviewCount: 2,
            description: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {
            image: 'https://s1.zerochan.net/Sakayanagi.Arisu.600.3582003.jpg',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 4.6,
            reviewCount: 2,
            description: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {
            image: 'https://s1.zerochan.net/Sakayanagi.Arisu.600.3582003.jpg',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 4.6,
            reviewCount: 2,
            description: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        }
    ]

    const reviews = [
        {   
            image: '',
            type: 'drink',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 2.6,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {   
            image: 'https://pbs.twimg.com/media/FRPsX0XXsAEtI2b?format=jpg&name=large',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 3.7,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {   
            image: 'https://pbs.twimg.com/media/FRPsX0XXsAEtI2b?format=jpg&name=large',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 1.5,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {   
            image: 'https://pbs.twimg.com/media/FRPsX0XXsAEtI2b?format=jpg&name=large',
            type: 'drink',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 4.5,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {   
            image: 'https://pbs.twimg.com/media/FRPsX0XXsAEtI2b?format=jpg&name=large',
            type: 'food',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 5,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        },
        {   
            image: '',
            type: 'drink',
            name: 'Lolinium',
            address: 'Hà Nội, Việt Nam',
            score: 4,
            title: 'Rất xinh đẹp, rất tao nhã. Xin camon'
        }
    ]
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <picture>
                    <img className={cx('search-bg')} src='https://i.imgur.com/VryhPt4.jpeg' alt='search section background' />
                </picture>
                <h1 className={cx('title')}>Tìm Nhà Hàng Theo Sở Thích</h1>
                <Search />
                <div className={cx('decor-layer')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 1366 217'>
                        <path d="M0,601a1849.2,1849.2,0,0,1,370-47c246.77-6.15,360,41.14,613,38,95.54-1.19,226.52-9.76,383-42q-.26,108.75-.5,217.5H-.5Z" fill="#ffffff" transform="translate(0 -550)"></path>
                    </svg>
                </div>
            </div>
            <div className={cx('main-part')}>
                <section className={cx('section')}>
                    <Container title='Gần tôi' data={restaurants} />
                </section>
                <section className={cx('section')}>
                    <Container title='Top Hot' data={restaurants} />
                </section>
                <section className={cx('section')}>
                    <Container title='Mới Nhất' data={restaurants} />
                </section>
                <section className={cx('section')}>
                    <Container Comp={CommentItem} data={reviews} title='Đánh giá mới' colWidth={[1,2,3,3]} />
                </section>
            </div>
        </div>
     );
}

export default Home;