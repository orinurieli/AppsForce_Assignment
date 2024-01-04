// Not Supported - had a bug in react version for some reason
// If I had more time I would use more hooks.
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://randomuser.me/api/?results=10';

const useFetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isActive) {

            axios.get(url).then((response) => {
                setData(response.data.results);
                setIsActive(true)
            }).catch((e) => {
                setError(e)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, []);

    return { data, loading, error };
};

export default useFetchData;
