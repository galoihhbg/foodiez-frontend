import styles from './Container.module.scss'
import styles2 from './Grid.module.scss'
import classNames from 'classnames/bind';
import RestaurantCard from '../../RestaurantCard';
import Button from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentItem from '../../CommentItem';

const cx = classNames.bind(styles)
const cx2 = classNames.bind(styles2)
function Container({title = '', toPage = '' ,data = [], Comp = RestaurantCard ,colWidth = [1,2,3,4]}) {
    const [index, setIndex] = useState(0)
    const [windowSize, setWindowSize] = useState(colWidth[3])
    const handleMoveRight = () => {
        if (index - windowSize + data.length > 0) {
            setIndex(index-1)
        }
    }

    const handleMoveLeft = () => {
        if (index < 0) {
            setIndex(index+1)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1200) {
                setWindowSize(colWidth[3])
            } else if (window.innerWidth > 992) {
                setWindowSize(colWidth[2])
            } else if (window.innerWidth > 576) {
                setWindowSize(colWidth[1])
            } else {
                setWindowSize(colWidth[0])
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    // eslint-disable-next-line
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1 className={cx('title')}>{title}</h1>
                <Link to={toPage} className={cx('view-all')}>
                    <span>Xem tất cả</span>
                    <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                </Link>
            </header>
            <div className={`${cx2('grid')} ${cx('container')}`}>
                <div style={{transform: `translateX(${index * 100 / windowSize}%)`, transition: 'transform 0.5s'}} className={cx2('row', 'no-wrap')}>
                    {data.map((item, index) => {
                        return <div key={index} className={cx2(`col`, `s-${12/colWidth[0]}`, `c-${12/colWidth[1]}`, `m-${12/colWidth[2]}`, `l-${12/colWidth[3]}`)}>
                                    <Comp data={item} />
                                </div>
                    })}
                </div>
            </div>
            <div style={{top: Comp === CommentItem ? '290.5px' : ''}} className={cx('slider-controls', 'right', `${index - windowSize + data.length <= 0 ? 'none' :''}`)}>
                <Button onClick={(e) => handleMoveRight()} circle outline small>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>

            <div style={{top: Comp === CommentItem ? '290.5px' : ''}} className={cx('slider-controls', 'left', `${index >= 0 ? 'none' :''}`)}>
                <Button onClick={(e) => handleMoveLeft()} circle outline small>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
            </div>
        </div>
     );
}

export default Container;