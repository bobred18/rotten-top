// CSS
import './Movie.css';

// React
import { useEffect, useState } from 'react';

// API
import { API_URL } from './api';
import axios from 'axios';
import { useParams } from 'react-router';

function Movie() {
    const BLANK = 'Unknown';

    const { id } = useParams();

    interface DataInterface {
        error?: string,
        title?: string,
        rating?: string,
        releaseDate?: string,
        image?: string,
        youtube?: string,
        director?: Array<PersonInterface>,
        writer?: Array<PersonInterface>,
        actor?: Array<PersonInterface>,
        remaster?: Array<PersonInterface>,
    }

    const [imgStatus, setImgStatus] = useState('');
    const [data, setData] = useState<DataInterface>({});

    useEffect(() => {
        const url = `${API_URL}/movies/${id}`;
        async function fetchData() {
            await axios.get(url).then((res) => setData(res.data));
        }
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (JSON.stringify(data) !== '{}')
            document.title = `${data.title} - Movies`;
    }, [data]);


    const { error, title, rating, releaseDate, image, youtube, director, writer, actor, remaster } = data;

    interface PersonInterface {
        name?: string,
        id?: string
    }

    function unpackPeople(array: Array<PersonInterface>) {
        const foo = array.reduce(
            (prev: any, curr: PersonInterface, index: number) => {
                return [...prev, <Person name={curr.name} id={curr.id} key={curr.id} index={index} length={array.length} />]
            }, []
        )
        return foo;
    }

    return (<div className='movie'>
        {JSON.stringify(data) === '{}' && imgStatus === ''
            ? <div style={{ textAlign: 'center', paddingTop: '10px' }}>Loading...</div>
            : <div className='hero'>
                {error
                    ? <div>
                        An error occured. {error}
                    </div>
                    :
                    <div className='grid'>
                        <div className='left'>
                            <div className='title'>
                                {title}
                            </div>
                            <div className='tile'>
                                Director: {director ? unpackPeople(director) : BLANK}
                            </div>
                            <div className='tile'>
                                Written by: {writer ? unpackPeople(writer) : BLANK}
                            </div>
                            {actor ?
                                <div className='tile'>
                                    Starring: {actor ? unpackPeople(actor) : BLANK}
                                </div>
                                : ''}
                            {remaster ?
                                <div className='tile'>
                                    Remaster: {remaster ? unpackPeople(remaster) : BLANK}
                                </div>
                                : ''}

                            <div className='rating'>
                                Rating:
                                < Stars rating={rating} />
                            </div>
                            <div className='tile'>
                                Release date: {releaseDate ? `${releaseDate.substring(5, 7)}.${releaseDate.substring(8, 10)}.${releaseDate.substring(0, 4)}` : BLANK}
                            </div>
                            <a className='play-button' href={youtube} target='_blank' rel='noreferrer'>
                                Watch on Youtube <IconPlay />
                            </a>
                        </div>
                        <div className='right'>
                            {imgStatus === 'error'
                                ? <div className='image-error' >No image available.</div>
                                : <img onLoad={() => setImgStatus('loaded')} onError={() => setImgStatus('error')} className='image' src={`/${image}.jpg`} alt={`No image available.`} /> //eslint-disable-line jsx-a11y/img-redundant-alt
                            }
                            <div className='image-title'>
                                {title} ({releaseDate ? releaseDate.substring(0, 4) : 'Year unkown'})
                            </div>
                        </div>
                    </div>
                }
            </div>
        }
    </div>);
}

function Person(props: any) {
    const { name, id, index, length } = props;
    return (
        <b>
            <a className='person-link' href={`/people/${id}`}>{name}</a>
            {(index < length && index !== length - 1) ? ', ' : ''}
        </b>
    );
}

function Stars(props: any) {
    const { rating } = props;
    let stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < parseInt(rating)) stars.push(<span key={i} className="fa fa-star checked" />);
        else stars.push(<span key={i} className="fa fa-star" />);
    }
    return (
        <div className='stars'>
            {stars}
            <b>
                {rating}/5
            </b>
        </div>
    );
}

function IconPlay() {
    return <svg className='icon-play' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
    </svg>;
}


export default Movie;