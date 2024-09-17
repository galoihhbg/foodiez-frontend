import styles from './Search.module.scss'
import classNames from 'classnames/bind'
import styles2 from './Grid.module.scss'
import { Pagination } from 'react-bootstrap';
import './CustomPagination.scss'
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantCard from '../../components/RestaurantCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
const cx2 = classNames.bind(styles2)
function Search() {
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1)
    // eslint-disable-next-line
    const [limit, setLimit] = useState(parseInt(queryParams.get('limit')) || 12)
    const [inputValue, setInputValue] = useState(queryParams.get('input') || '')
    const [magnify, setMagnify] = useState(inputValue !== '')
    const [total,setTotal] = useState(0);
    // eslint-disable-next-line
    const [quantity, setQuantity] = useState(12)
    const [searchResult, setSearchResult] = useState([])
    const inputRef = useRef(null)

    const {city} = useParams()
    const moveToPage = (p) => {
        setPage(p)
        setMagnify(true)
        queryParams.set('page', p)
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }

    const handleClick = (inputValue) => {
        setPage(1)
        queryParams.set('page', 1)
        setMagnify(true)
        queryParams.set('input', inputValue)
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }
    const basedURL = 'http://localhost:10000/restaurants/search'
    const handleResult = (resData) => {
        const convertedData = resData.map(item => {
            const data = item._source;
            return {
                ...data,
                city: item._index.split('_')[0]
            };
        });
        setSearchResult(convertedData)
    }

    useEffect(() => {
        if (inputValue === '' || !magnify) {
            return;
        }
        fetch(`${basedURL}?input=${inputValue}&city=${city}&page=${page}&limit=${limit}`)
            .then(res => res.json())
            .then(res => {
                handleResult(res.data)
                setTotal(res.total)
                setMagnify(false)
            })
    // eslint-disable-next-line
    },[magnify, city, page, limit])
    return ( 
        <div className={cx('wrapper')}>
            <input spellCheck={false} value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} className={cx('search-input')} type='text' placeholder='Nhập tên thành phố, quán ăn' />
            <button onClick={() => handleClick(inputValue)} className={cx('search-btn')}>{<FontAwesomeIcon icon={faMagnifyingGlass} />}</button>
            <main className={cx('container')}>
                    <div className={cx2('row')}>
                        {searchResult ? searchResult.map((item, index) => {
                            return <div key={index} className={cx2(`col`, `s-12`, `c-6`, `m-4`, `l-3`)}>
                                        <div className={cx('item')}>
                                            <RestaurantCard data={item} />
                                        </div>
                                    </div>
                        }) : ''}
                    </div>
                </main>

                <footer style={{display: total === 0 ? 'none' : ''}} className={cx('footer-pagination')}>
                {
                    total < limit ? '' :
                    <Pagination>
                        <Pagination.Prev disabled={page === 1} onClick={()=>moveToPage(page - 1)} />
                        {
                        [...Array(5).keys()].map((_,i)=> {
                            if (!page || page <= 3) {
                                return (i + 1)
                            }

                            if (page >= Math.ceil(total / limit) - 2) {
                                return (i + Math.ceil(total /limit) - 4)
                            }

                            return i + page - 2
                        }).map((number, index) => {
                                return <Pagination.Item disabled={number > Math.ceil(total / limit) || (quantity < limit && number > page )} onClick={() => moveToPage(number)} key={index} active={page === number} >{number}</Pagination.Item>
                            })
                        }
                        <Pagination.Next disabled={page === Math.ceil(total / limit)} onClick={()=>moveToPage(page + 1)} />
                    </Pagination>
                }
                </footer>
        </div>
     );
}

export default Search;