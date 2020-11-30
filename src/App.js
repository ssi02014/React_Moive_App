import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
      getMoives(FEATURED_API);
  }, []);

  const getMoives = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
      e.preventDefault();

      if(searchTerm) {
        getMoives(SEARCH_API + searchTerm);
      }

      setSearchTerm('');
  }

  const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
  }
  return (
    <div>
      <header>
        <h2><em>JMJ.</em> Movie App</h2>
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="search" 
            placeholder="Search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}></Movie>)}
      </div>
    </div>
  );
}

export default App;
