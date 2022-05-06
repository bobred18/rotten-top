// CSS
import './App.css';

// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import Bar from './Bar';
import Home from './Home';
import Movie from './Movie';
import Movies from './Movies';
import People from './People';
import PersonProfile from './PersonProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Bar />
        <div className='under-bar'>
          <Home />
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='people' element={<People />} />
            <Route path={'people/:id'} element={<PersonProfile />} />
            <Route path='movies' element={<Movies />} />
            <Route path={`movies/:id`} element={<Movie />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
