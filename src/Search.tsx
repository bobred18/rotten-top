// CSS
import './Search.css';

// React
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

// API
import { API_URL } from './api';
import axios from 'axios';

function Search() {

    const [query, setQuery] = useState('');
    const [data, setData] = useState<Object>({});

    useEffect(() => {
        axios.get(`${API_URL}/people`).then((res) => { setData(res.data) })
    }, [])

    return <div className='search-box'>
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" />
        {JSON.stringify(data) !== '{}' && performSearch(Object.entries(data), query).map(x => <SearchCard key={x[0]} propKey={x[0]} data={x[1]} />)}
    </div>
}

function performSearch(arr: Array<any>, query: string) {
    const queryArr = query.toLowerCase().split(' ').filter(x => x);
    console.log('queryArr: ', queryArr);
    return arr.filter(x => {
        console.log('x: ', x)
        return queryArr.filter
            (queryPart =>
                x[1].id.toLowerCase().includes(queryPart.toLowerCase())
                ||
                x[1].fname.toLowerCase().includes(queryPart.toLowerCase())
                ||
                (
                    x[1].lname
                    &&
                    x[1].lname.toLowerCase().includes(queryPart.toLowerCase())
                )
            ).length > queryArr.length - 1
    })
}

function SearchCard(props: any) {

    const { propKey, data } = props;

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/people/${propKey}`);
    }
    return <div onClick={handleClick} className='search-card'>
        <h3>{`${data.fname} ${data.lname || ''}`}</h3>
    </div>
}

export default Search;