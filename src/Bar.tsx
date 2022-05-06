// CSS
import './Bar.css';

// Router
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function Bar() {

    const linkStyle = { textDecoration: 'none' };

    const subtitle = useSelector((state: any) => state.subtitle);

    return (
        <div className='bar'>
            <div className='brand'>
                <Link to='/movies' style={{ color: 'whitesmoke', textDecoration: 'none' }}>
                    <a style={{ color: 'whitesmoke', textDecoration: 'none', fontFamily: 'monospace' }} href="/">
                        Rotten
                        <b>
                            TOP
                        </b>
                    </a>
                </Link>
            </div>
            <div className='subtitle'>
                {subtitle}
            </div>
        </div>);
}

export default Bar;