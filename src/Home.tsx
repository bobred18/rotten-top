// CSS
import './Home.css';

// React
import { Link } from 'react-router-dom';

function Home() {

    const linkStyle = { textDecoration: 'none' };

    return <div className='home'>
        <div className="top-container">
            <Greeting />
            <div className='top-btn-grid'>
                <Link to='/movies' style={linkStyle}>
                    <button className='top-btn left'>Movies</button>
                </Link>
                <Link to='/people' style={linkStyle}>
                    <button className='top-btn right'>People</button>
                </Link>
            </div>
        </div>
        <div className='bar-filler' />
    </div>

}

function Greeting() {
    return <div className='greeting'>
        <h1 style={{ textAlign: 'center', color: '#ddd', lineHeight: '1', margin: '5px', fontWeight: '300' }}>
            Theory Of Paper Movie Database
        </h1>
        {/* <div className='brackets-holder'>
            <div className='bracket'>(</div>
            <p style={{ maxWidth: '400px', color: '#ddd', fontWeight: '300', lineHeight: '1', margin: '5px', textAlign: 'center' }}>
                &#8505; RESTful API Project Showcase (in Node.js/Express)<br />
                hosted in Firebase Functions<br />
                created by Jakub Cisło
            </p>
            <div className='bracket'>)</div>
        </div> */}
        <div className='brackets-holder'>
            <div className='bracket'>(</div>
            <p style={{ maxWidth: '400px', color: '#ddd', fontWeight: '300', lineHeight: '1', margin: '5px', textAlign: 'center' }}>
                Try hitting some endpoints <br />
                <a style={{ color: 'aqua' }} href='https://us-central1-rotten-top-api.cloudfunctions.net/app'>https://us-central1-rotten-top-api.cloudfunctions.net/app</a><br />
                With e.g: <b>/movies, /people, /movies/kitchen-goblin, /people/exizek</b>
            </p>
            <div className='bracket'>)</div>
        </div>
    </div>
}

export default Home;