import Wrapper from '../Wrapper';
import styles from './SearchResult.module.scss'
import classNames from 'classnames/bind';
import Button from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import config from '../../../config'

const cx = classNames.bind(styles)
function SearchResult({city, input, results = []}) {
    return ( 
        <div className={cx('wrapper')}>
            <Wrapper>
                {results.map((result, index) => {
                    return <Button 
                        title = {`${result._source.name}, ${result._source.address}`}
                        to={config.routes.reviews.replace(':city', city).replace(':restaurant', result._source.id)} 
                        leftIcon={<FontAwesomeIcon icon={faLocationDot} />} 
                        classnames={['search-result-item']} 
                        key={index} 
                        >
                            {`${result._source.name}, ${result._source.address}`}
                        </Button>
                })}
            </Wrapper>
            <Button to={`${config.routes.search.replace(':city', city)}?input=${input}`}>Xem thêm</Button>
        </div>
     );
}

export default SearchResult;