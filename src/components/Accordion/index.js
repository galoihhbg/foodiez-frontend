import styles from './Accordion.module.scss'
import classNames from 'classnames/bind'

import { useState } from 'react'

const cx = classNames.bind(styles)
function Accordion({children, show = 1, ml = 0, mt = 0}) {
    const [showAll, setShowAll] = useState(false)
    const handleClick = () => {
        setShowAll(!showAll)
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('show')}>
                {
                    children.slice(0, show).map(element => {
                        return element
                    })
                }
            </div>
            <div style={{display: showAll ? 'block' : ''}} className={cx('more')}>
                {
                    children.slice(show, children.length).map(element => {
                        return element
                    })
                }
            </div>
            <button style={{display: show === children.length ? 'none' : '',marginLeft: ml, marginTop: mt}} onClick={(e) => handleClick()} className={cx('toggle')}>{showAll ? 'Ẩn đi' : 'Xem thêm'}</button>
        </div>
     );
}

export default Accordion;