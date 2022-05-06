// CSS
import './PersonProfile.css';

// React
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";

// API
import { API_URL } from "./api";
import axios from "axios";

// Redux
import { setSubtitle } from './redux/actions';
import { useDispatch } from 'react-redux';

function PersonProfile() {

    const { id } = useParams();

    const [data, setData] = useState<PersonRealInterface>({});
    const [movies, setMovies] = useState<Array<Object>>([]);
    const [loaded, setLoaded] = useState(false);

    const dispatch = useDispatch();

    interface PersonRealInterface {
        id?: string,
        fname?: string,
        lname?: string,
    }

    useEffect(() => {
        dispatch(setSubtitle('people'));
        async function fetchData() {
            await axios.get(`${API_URL}/people/${id}`).then((res) => { setData(res.data) })
        }
        fetchData();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (JSON.stringify(data) !== '{}') {
            axios.get(`${API_URL}/movies`).then((res) => { getPersonsMovies(res.data) })
            console.log('data: ', data);
            document.title = `${data.fname} ${data.lname || ''} - People`;
        }
    }, [data]) //eslint-disable-line react-hooks/exhaustive-deps


    function getPersonsMovies(obj: Object) {
        const arr = [...makeArrayFromObject(obj)];
        const newArr = arr
            .map(x => (x.writer || x.director || x.remaster || x.actor) ? x : null)
            .map(x => JSON.stringify(x).includes(id || '') ? x : null)
            .map((x, i) => x ? arr[i] : null)
            .map((x, i) => x && Object.entries(x).map(y => JSON.stringify(y[1]).includes(id || '') ? y[0] : '').filter(x => x))
        const finalRelatedMovies = newArr.map((x, i) => { return x ? { roles: x.join(', '), title: arr[i].title, id: arr[i].id } : {} });
        setMovies(finalRelatedMovies);
        setLoaded(true);
    }

    interface PersonMoviesInterface {
        id?: string,
        roles?: string,
        title?: string,
    }

    return <div className="person-profile">
        {loaded
            ? <div className="person-profile-box">
                <div className='person-icon-holder' style={{ height: '190px' }}>
                    <PersonFillIcon />
                </div>
                <h1 style={{ lineHeight: '1' }}>
                    {`${data.fname || ''} ${data.lname || ''}`}
                </h1>
                <div>
                    <div style={{ color: '#494949', fontWeight: '700', fontSize: '24px' }}>
                        &middot; MOVIES &middot;
                    </div>
                    {movies && movies.filter(x => x).map((x: PersonMoviesInterface) =>
                        <div key={x.id}>

                            <div style={{ fontWeight: '300', fontSize: '20px', marginTop: '10px' }}>
                                {x.roles}
                            </div>
                            <Link to={`/movies/${x.id}`} style={{ color: 'black', textDecoration: 'none', fontSize: '18px' }}>
                                <div style={{ fontWeight: '500' }}>
                                    {x.title}
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            : <div className='loading' >Loading...</div>
        }
        {loaded ? <Link to='/movies' className='come-back-link'>&laquo; Go back to home</Link> : ''}



    </div >
}



function PersonFillIcon() {
    return <svg className='person-icon' xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="white" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>;
}

export default PersonProfile;

function makeArrayFromObject(obj: object) {
    return Object.entries(obj).map(o => { return { ...o[1], id: o[0] } });
}




















// function getPersonsMovies(personId, obj) {
//     const arr = Object.entries(obj);
//     // ISSUE IS HERE!!! FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//     const propertyOwners = arr.map(x => x[1])?.map(x => (x.remaster || x.writer) ? x : null);

//     // const filteredOwners = propertyOwners.map(x => x).map(x => x?.map(y => y.id).filter(y => y === personId)).map(x => x?.length > 0 ? x : undefined);
//     const filteredOwners = propertyOwners
//         .map(x => x)
//         .map(x => {
//             [...returnArrayForSure(x)]?.map(y => y.id).filter(y => y === personId)
//         })
//         .map(x => x?.length > 0 ? x : undefined);
//     console.log('filteredOwners: ', filteredOwners);

//     const finalMovies = filteredOwners.map((x, i) => x ? arr[i][1] : '').filter(x => x);
//     console.log('finalMovies: ', finalMovies);
//     setMovies([...finalMovies]);
// }

// function returnArrayForSure(foo) {
//     console.log('foo: ', foo);
//     console.log('typeof foo: ', typeof foo);
//     if (!foo) { return []; }
//     if (typeof foo !== 'Array') {
//         return [foo];
//     } else {
//         return foo;
//     }
// }