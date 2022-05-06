// CSS
import './People.css';

// Components
import Search from './Search';

// Redux
import { setSubtitle } from './redux/actions';
import { useDispatch } from 'react-redux';

// React
import { useEffect } from 'react';

function People() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSubtitle('people'))
        document.title = 'RottenTOP - People'
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    return <div className="people">
        <h1 className='title'>Browse Theory Of Paper Members</h1>
        <Search />
    </div>
}

export default People;