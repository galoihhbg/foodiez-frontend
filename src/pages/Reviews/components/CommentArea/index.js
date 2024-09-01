import styles from './CommentArea.module.scss'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react';
import { useFetch } from '../../../../hooks';

import RatingBar from '../../../../components/RatingBar';
import RatingStar from '../../../../components/RatingStar';
import CommentsContainer from '../CommentsContainer';
import Button from '../../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)
function CommentArea({resData, link}) {
    const [content, setContent] = useState(null)
    const [isFiltered, setFiltered] = useState(false)
    const [showTab, setShowTab] = useState(true)
    const [filteredData, setFilteredData] = useState(null)
    const [realScore, setRealScore] = useState(null)
    // eslint-disable-next-line
    const [filterError, setFilterError] = useState(null)
    // eslint-disable-next-line
    const [loadingFilter, setLoadingFilter] = useState(true)
    const config = {
        ...link,
    }

    const aspectTrans = {
        'Chất lượng' : 'QUALITY',
        'Giá cả' : 'PRICES',
        'Phục vụ':'SERVICE',
        'Không gian':'AMBIENCE',
        'Vị trí':'LOCATION'
    }

    const handleFilterClick = () => {
        if (!isFiltered) {
            setFiltered(true)
        }
        console.log(showTab)
        setShowTab(!showTab)
    }

    const average = (arr) => {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    const overallAverage = (scores) => {
        let totalSum = 0;
        let totalCount = 0;

        for (const key in scores) {
            const scoreArray = scores[key];
            if (scoreArray.length > 0) {
                const sum = scoreArray.reduce((acc, val) => acc + val, 0);
                totalSum += sum;
                totalCount += scoreArray.length;
            }
        }

        return totalCount > 0 ? totalSum / totalCount : null;
    }

    const exactScore = (comments, filter) => {
        const filteredScore = {
            'Vị trí': [],
            'Giá cả': [],
            'Chất lượng': [],
            'Phục vụ': [],
            'Không gian': []
        }
        for (let i = 0; i < comments.length; i ++ ) {
            for (let j = 0; j < comments[i].user_tbscore.length; j ++) {
                if (filter.result[i].includes(aspectTrans[Object.keys(comments[i].user_tbscore[j])[0]])) {
                    filteredScore[Object.keys(comments[i].user_tbscore[j])[0]].push(Object.values(comments[i].user_tbscore[j])[0])
                }
            }
        }


        return filteredScore
    }
    const {data, error, loading} = useFetch('http://localhost:10000/comments', 'GET', config)

    useEffect(() => {
        if (loading) {
            console.log('Loading...');
        } else if (error) {
            console.error('Error fetching data:', error);
        } else if (data) {
            const content = data.map(cmt => {
                return cmt.user_comment
            })

            setContent(Object.assign({}, content))
        }
        return () => {}
    }, [data, loading, error]);


    useEffect(() => {
        if (content) {
            const fetchFilteredData = async () => {
                setLoadingFilter(true);
                try {
                    const response = await fetch('http://192.168.2.220:8080/predict/aspects', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(content),
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setFilteredData(result);
                    setRealScore(exactScore(data, result))
                } catch (error) {
                    setFilterError(error);
                } finally {
                    setLoadingFilter(false);
                }
            };

            fetchFilteredData();
        }
    // eslint-disable-next-line
    }, [isFiltered]);
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('btn-switch')}>
                <Button onClick={() => handleFilterClick()} medium outline leftIcon={<FontAwesomeIcon icon={faFilter} />}>{!showTab ? 'Dữ liệu gốc' : 'Lọc Bằng AI'}</Button>
            </div>
            {
                showTab ? 
                <div className={cx('tab-content')}>
                    <div className={cx('rating')}>
                        <div className={cx('total')}>
                            <span className={cx('score')}>{`${resData.info.point_overall / 2} / 5`}</span>
                            <RatingStar data={{score: resData.info.point_overall / 2, grade: 5}} />
                            <span className={cx('total-reviews')}>{`(${resData.comment} đánh giá)`}</span>
                        </div>
                        <div className={cx('list')}>
                            {resData.info.table_score.map((aspect, index) => {
                                return <div key={index} className={cx('list-item')}>
                                        <span className={cx('aspect')}>{Object.keys(aspect)[0]}</span>
                                        <RatingBar data={{point: Object.values(aspect)[0] / 2, grade: 5}} />
                                    </div>
                            })}
                        </div>
                    </div>
                    <div className={cx('container')}>
                        <CommentsContainer title={`${resData.comment} Đánh giá`} total={resData.comment} restaurant={{name:resData.info.name_shop}} data={loading ? [] : data || []} />
                    </div>
                </div>
                :
                <div className={cx('tab-content')}>
                    { filteredData ? 
                        <>
                            <div className={cx('rating')}>
                                <div className={cx('total')}>
                                    <span className={cx('score')}>{`${Math.round(overallAverage(realScore) * 100) / 200} / 5`}</span>
                                    <RatingStar data={{score: Math.round(overallAverage(realScore) * 100) / 200, grade: 5}} />
                                    <span className={cx('total-reviews')}>{`(${resData.comment} đánh giá)`}</span>
                                </div>
                                <div className={cx('list')}>
                                    {resData.info.table_score.map((aspect, index) => {
                                        return <div key={index} className={cx('list-item')}>
                                                <span className={cx('aspect')}>{Object.keys(aspect)[0]}</span>
                                                <RatingBar data={{point: Math.round(average(realScore[Object.keys(aspect)[0]]) * 100) / 200, grade: 5}} />
                                            </div>
                                    })}
                                </div>
                            </div>
                            <div className={cx('container')}>
                                <CommentsContainer title={`${resData.comment} Đánh giá`} total={resData.comment} restaurant={{name:resData.info.name_shop}} data={loading ? [] : data || []} filter={filteredData} />
                            </div>
                        </> : ''
                    }
                </div>
            }
        </div>
     );
}

export default CommentArea;