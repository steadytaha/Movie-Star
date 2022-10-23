import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=ee37990d';

const App = () => {
    const [movies, setMoives] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMoives(data.Search);
    };

    useEffect(()=> {
        searchMovies('Avengers')
    }, [])

    return (
        <div className='app'>
            <h1>Movie Star</h1>

            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>   
                ))}
            </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;