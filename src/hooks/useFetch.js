import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url, method = 'GET', payload = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method,
          url,
          ...(method === 'GET' ? { params: payload } : { data: payload }),
        };

        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        console.error('Fetching data error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
    // eslint-disable-next-line
  }, [url, method, JSON.stringify(payload)]);

  return { data, error, loading };
}

export default useFetch;
