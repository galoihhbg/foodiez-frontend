import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss'
import classNames from 'classnames/bind';
import { faLocationArrow, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless'
import { useEffect, useRef, useState } from 'react';
import SearchResult from '../../../../components/Popper/SearchResult';

const cx = classNames.bind(styles)
function Search() {
    const results = [
        {
            name: 'Cầu Giấy, Hà Nội',
            type: 'location'
        },
        {
            name: 'Cầu Giấy, Hà Nội',
            type: 'location'
        },
        {
            name: 'Bia Hơi Cầu Giấy',
            type: 'restaurant'
        },
        {
            name: 'Bia Hơi Cầu Giấy',
            type: 'restaurant'
        }
    ]
    const inputRef = useRef(null)
    const [inputWidth, setInputWidth] = useState()
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            if (inputRef.current) {
                setInputWidth(inputRef.current.offsetWidth)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return ( 
        <div className={cx('wrapper')}>
             <Tippy
                onClickOutside={(e) => setVisible(false)}
                visible = {visible}
                interactive
                placement='bottom'
                render={attrs => (
                <div style={{width: inputWidth}} className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Link className={cx('default-btn')}>
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <span>Vị trí hiện tại</span>
                        </Link>
                        <SearchResult results={results} />
                </div>
                )}
            >
                <input spellCheck={false} onFocus={(e) => {setVisible(true)}} ref={inputRef} className={cx('search-input')} type='text' placeholder='Nhập tên thành phố, quán ăn' />
            </Tippy>
            <Link className={cx('search-btn')}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</Link>
        </div>
     );
}

export default Search;