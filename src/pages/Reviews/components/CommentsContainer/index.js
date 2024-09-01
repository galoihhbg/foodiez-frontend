import { Pagination } from 'react-bootstrap';
import CommentBox from '../CommentBox';
import styles from './CommetsContainer.module.scss'
import classNames from 'classnames/bind'
import './CustomPagination.scss'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)
function CommentsContainer({title, total, restaurant, data, filter}) {
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1)
    const [orderBy, setOrderBy] = useState('date-desc')
    // eslint-disable-next-line
    const [limit, setLimit] = useState(10)
    const [comments, setComments] = useState(data)

    const moveToPage = (p) => {
        setPage(p)
        queryParams.set('page', p)
        navigate(`${location.pathname}?${queryParams.toString()}`);
    }

    const dateDesc = (cmt1, cmt2) => {
        return new Date(cmt2.user_timec) - new Date(cmt1.user_timec)
    }

    useEffect(() => {
        setComments(data.sort((cmt1, cmt2) => dateDesc(cmt1, cmt2)))
    }, [data, orderBy])

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h3 className={cx('title')}>{title}</h3>
                <select name="orderby" className={cx('orderby')} onChange={(e) => setOrderBy(e.target.value)} >
                    <option value="date-desc">Mới Nhất</option>
                    <option value="date-asc">Cũ Nhất</option>
                    <option value="rating-desc">Rating Cao Nhất</option>
                    <option value="rating-asc">Rating Thấp Nhất</option>
                </select>
            </header>
            <main className={cx('container')}>
                {
                    comments.slice((page - 1) * limit, page * limit - 1).map((cmt, index) => {
                        return <CommentBox data={cmt} filtered = {filter ? filter.result[index + (page - 1) * limit] : null} key={index} title={restaurant.name} />
                    })
                }
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
                            return <Pagination.Item disabled={number > Math.ceil(total / limit)} onClick={() => moveToPage(number)} key={index} active={page === number} >{number}</Pagination.Item>
                        })
                    }
                    <Pagination.Next disabled={page === Math.ceil(total / limit)} onClick={()=>moveToPage(page + 1)} />
                </Pagination>
            }
            </footer>
        </div>
     );
}

export default CommentsContainer;