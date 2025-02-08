import {useEffect, useState} from "react";

export function useFetch(fetchFunction, initialState) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialState);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFunction();
                setData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }
            setIsFetching(false);
        }
        fetchData();
    }, [fetchFunction]);

    return {isFetching, data, setData, error};
}