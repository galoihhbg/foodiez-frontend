import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss'
import classNames from 'classnames/bind';
import { faLocationArrow, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless'
import { useEffect, useRef, useState } from 'react';
import SearchResult from '../../../../components/Popper/SearchResult';
import {useDebounce} from '../../../../hooks'

const cx = classNames.bind(styles)
function Search({city}) {
    const inputRef = useRef(null)
    const [inputWidth, setInputWidth] = useState()
    const [visible, setVisible] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const basedURL = 'http://localhost:10000/restaurants/search'
    const debounced = useDebounce(searchValue, 500)
    useEffect(() => {
        if (!debounced) {
            setSearchResult([]);
            return;
        }
        fetch(`${basedURL}?input=${debounced}&city=${city}`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data)
            })
    }, [debounced, city])

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
                visible = {visible && searchResult && searchValue.length > 0}
                interactive
                placement='bottom'
                render={attrs => (
                <div style={{width: inputWidth}} className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Link className={cx('default-btn')}>
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <span>Vị trí hiện tại</span>
                        </Link>
                        {searchResult.length > 0 ? <SearchResult city={city} input={debounced} results={searchResult} /> : ''}
                </div>
                )}
            >
                <input spellCheck={false} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onFocus={(e) => {setVisible(true)}} ref={inputRef} className={cx('search-input')} type='text' placeholder='Nhập tên thành phố, quán ăn' />
            </Tippy>
            <Link className={cx('search-btn')}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</Link>
        </div>
     );
}

export default Search;