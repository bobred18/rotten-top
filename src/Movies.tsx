// CSS
import './Movies.css';

// Redux
import { setCurrentId, setSubtitle, setVanish } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";

// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// API
import { API_URL } from "./api";
import axios from "axios";

function Movies() {

    const dispatch = useDispatch();
    const vanish = useSelector((state: any) => state.vanish);

    const [data, setData] = useState<Object>();

    useEffect(() => {
        axios.get(`${API_URL}/movies`).then((res) => setData(res.data));
        dispatch(setVanish(false));
        document.title = 'RottenTOP - Movies';
        dispatch(setSubtitle('movies'))
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    function deconstruct(data: any) {
        let newArr = [];
        for (let key in data) {
            newArr.push(<MovieCard data={data[key]} ownKey={key.toString()} />);
        }
        return newArr;
    }

    return (<div className={`movies ${vanish ? 'vanish' : ''}`} >
        <div className="grid">
            {data && deconstruct(data).reverse()}
        </div>
    </div>);
}

function MovieCard(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ownKey = props.ownKey;
    const { title, image } = props.data;
    const [fill, setFill] = useState(false);
    function handleClick() {
        setFill(!fill);
        dispatch(setVanish(true));
        dispatch(setCurrentId(ownKey));
        setTimeout(function () {
            navigate(`/movies/${ownKey}`);
        }, 1000);
    }

    return (
        <div onClick={handleClick} className={`box-shadow movie-card ${fill ? 'movie-card-growing' : ''}`} style={{ backgroundImage: `url("/${image}.jpg")` }}>
            <div className="title">
                {title}
            </div>
        </div>
    );
}

export default Movies;