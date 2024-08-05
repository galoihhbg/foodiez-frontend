import Wrapper from '../Wrapper';
import styles from './SearchResult.module.scss'
import classNames from 'classnames/bind';
import Button from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)
function SearchResult({results = null}) {

    const [locations, setLocations] = useState([])
    const [restaurants, setRestaurants] = useState([])

    const splitResults = (results) => {
        if (results) {
            setLocations(results.filter((result) => {return result.type === 'location'}))
            setRestaurants(results.filter((result) => {return result.type === 'restaurant'}))
        }
    }

    useEffect(()=> {
        splitResults(results)
    }, [results])
    return ( 
        <div className={cx('wrapper')}>
            {
                locations.length > 0 ?  
                <div> 
                    <h3 className={cx('title')}>Vị trí</h3>
                    <Wrapper>
                        {locations.map((result, index) => {
                            return <Button leftIcon={<FontAwesomeIcon icon={faLocationDot} />} classnames={['search-result-item']} key={index} >{result.name}</Button>
                        })}
                    </Wrapper>
                </div> : ''
            }

            {
                restaurants.length > 0 ?
                <div> 
                    <h3 className={cx('title')}>Quán ăn</h3>
                    <Wrapper>
                        {restaurants.map((result, index) => {
                            return <Button leftIcon={<FontAwesomeIcon icon={faLocationDot} />} classnames={['search-result-item']} key={index} >{result.name}</Button>
                        })}
                    </Wrapper>
                </div> : ''
            }
        </div>
     );
}

export default SearchResult;