import styles from './List.module.scss'
import styles2 from './Grid.module.scss'
import classNames from 'classnames/bind';
import { Pagination } from 'react-bootstrap';
import './CustomPagination.scss'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantCard from '../../components/RestaurantCard';
import useFetch from '../../hooks/useFetch';

const cx = classNames.bind(styles)
const cx2 = classNames.bind(styles2)
function List({data = []}) {
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1)
    // eslint-disable-next-line
    const [orderBy, setOrderBy] = useState(queryParams.get('orderby') || 'date-desc')
    // eslint-disable-next-line
    const [limit, setLimit] = useState(12)
    const total = 1200;
    const [quantity, setQuantity] = useState(12)

    const {city} = useParams()
    const moveToPage = (p) => {
        setPage(p)
        queryParams.set('page', p)
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }

    const mapping = {
        'date-desc': {val: ['shop_order', 'desc'], title: 'Mới Nhất'},
        'rating-desc': {val: ['info.point_overall', 'desc'], title: 'Điểm Cao Nhất'},
        'review-desc': {val: ['info.isShare', 'desc'], title: 'Nhiều Review Nhất'}
    }
    const basedURL = 'http://localhost:10000/restaurants'
    // eslint-disable-next-line
    const {data: resData, error: resError, loading: resLoading} = useFetch(basedURL + '/index', 'POST', {
        city,
        constraints: [
            {orderBy: mapping[orderBy].val}
        ],
        limit,
        pageNum: page
    })

    useEffect(() => {
        if (resLoading) {
            console.log('Loading...');
        } else if (resError) {
            console.error('Error fetching data:', resError);
        } else if (resData) {
            setQuantity(resData.length)
        }
    }, [resData, resLoading, resError]);

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <header className={cx('header')}>
                    <h3 className={cx('title')}>{mapping[orderBy].title}</h3>
                    <select name="orderby" className={cx('orderby')} onChange={(e) => setOrderBy(e.target.value)} >
                        <option value="date-desc">Mới Nhất</option>
                        <option value="rating-desc">Điểm Cao Nhất</option>
                        <option value="review-desc">Nhiều Review Nhất</option>
                    </select>
                </header>
                <main className={cx('container')}>
                    <div className={cx2('row')}>
                        {resData ? resData.map((item, index) => {
                            return <div key={index} className={cx2(`col`, `s-12`, `c-6`, `m-4`, `l-3`)}>
                                        <div className={cx('item')}>
                                            <RestaurantCard data={item} />
                                        </div>
                                    </div>
                        }) : ''}
                    </div>
                </main>

                <footer className={cx('footer-pagination')}>
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
        </div>
     );
}

export default List;