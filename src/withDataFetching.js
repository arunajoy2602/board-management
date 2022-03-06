import React, { useState, useEffect } from 'react';

export default function withDataFetching(WrappedComponent) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch(props.dataSource);
                const dataJSON = await data.json();

                if (dataJSON) {
                    setData(dataJSON);
                    setLoading(false);
                }
            }
            fetchData()
        } catch (error) {
            setLoading(false);
            setError(error.message)
        }
    }, [])
    return (
        <WrappedComponent
            data={data}
            loading={loading}
            error={error}
        />

    )
}
