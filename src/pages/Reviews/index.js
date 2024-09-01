import CommentArea from './components/CommentArea';
import Detail from './components/Detail';
import RestaurantInfo from './components/RestaurantInfo';
import styles from './Reviews.module.scss'
import classNames from 'classnames/bind'

import styles2 from './Grid.module.scss'
import { useFetch } from '../../hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)
const cx2 = classNames.bind(styles2)
function Reviews() {
    const apiURI = 'http://localhost:10000/restaurants/reviews'
    const {city, restaurant} = useParams()
    const config = {
        city,
        restaurant
    }
    const {data, error, loading} = useFetch(apiURI, 'GET', config)

    useEffect(() => {
        if (loading) {
            console.log('Loading...');
        } else if (error) {
            console.error('Error fetching data:', error);
        } else if (data) {
            console.log(data);
        }
    }, [data, loading, error]);
    

    return ( 
        <div className={cx('wrapper')}>
            <div className={`${cx2('grid')} ${cx('container')}`}>
                <div className={cx2('row', 'no-margins')}>
                    <div className={`${cx2('col', 'st-12', 't-7', 'm-8', 'l-8')} ${cx('main-venue')}`}>
                        {loading ? '' : <RestaurantInfo data={data} />}
                    </div>

                    <div className={`${cx2('col', 'st-12', 't-5', 'm-4', 'l-4')} ${cx('detail-info')}`}>                      
                        {loading ? '': <Detail data={data} />}
                    </div>

                    <div className={`${cx2('col', 'st-12', 't-7', 'm-8', 'l-8')} ${cx('comment-area')}`}>
                        {loading ? '' : <CommentArea resData={data} link={{city, restaurant}} />}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Reviews;