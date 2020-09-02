import React, {useState, useEffect, useLayoutEffect} from 'react';
import './Dashboard.css';
import Movie from "./Movie";
import Searchbar from "./Searchbar";


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const search = (searchValue) => {
        setErrorMessage(null);

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=6e6fccd5`)
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.Response === "True") {
                setMovies(jsonResponse.Search);
            } else {
                setErrorMessage(jsonResponse.Error);
            }
        });
    };

    return (
        <div className="App">
            <Searchbar search={search} />
            <div className="movies">
                {errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    movies.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
    
}
export default Dashboard;
