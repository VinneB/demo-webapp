import React from 'react';
import { useEffect, useState } from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

// APIKEY: 2fe5618e

const API_URL = "http://omdbapi.com?apikey=2fe5618e";

const tempMovie = {
    "Title": "Batman v Superman: Dawn of Justice",
    "Year": "2016",
    "imdbID": "tt2975590",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  }


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (movieName) => {
        const response = await fetch(`${API_URL}&s=${movieName}`);
        const movieData = await response.json();

        setMovies(movieData.Search)
    } 

    useEffect( () => {

        searchMovies("Catwoman");

    }, []);

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className='search'>
                <input 
                    placeholder='Search'
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            { movies?.length > 0 ? 

            (
            <div className="container">
                {
                    movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))
                }
            </div>

            )

            : (
                <div className="empty"><h2>No movies found</h2></div>
                
            )

        }


        </div>
    )
}

export default App;