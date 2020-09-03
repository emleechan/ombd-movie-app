import React, {useState, useEffect, useLayoutEffect} from 'react';
import Movie from "../Movie/Movie";
import Searchbar from "../Searchbar/Searchbar";
import Nomination from "../Nomination/Nomination";
import { Grid, Segment, Message, Divider } from 'semantic-ui-react'
import './Dashboard.css';
import './../Nomination/Nomination.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [nominations, setNomination] = useState(
        JSON.parse(localStorage.getItem("localStorage")) || []
    );
    const [errorMessage, setErrorMessage] = useState(null);
    
    const search = (searchValue) => {
        setLoading(true);
        setErrorMessage(null);
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=6e6fccd5`)
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.Response === "True") {
                setLoading(false);
                setMovies(jsonResponse.Search);
            } else {
                setLoading(false);
                setErrorMessage(jsonResponse.Error);
            }
        })
        .catch((error) => {
            setLoading(false);
            setErrorMessage(error.toString());
        });
    };

    const nominate = (movie) => {
        const newNomination = [...nominations, movie];
        setNomination(newNomination);
        localStorage.setItem("localStorage", JSON.stringify(newNomination));
    };

    const deleteNomination = (imdbID) => {
        const newNomination = nominations.filter(movie => movie.imdbID !== imdbID);
        setNomination(newNomination);
        localStorage.setItem("localStorage", JSON.stringify(newNomination));
    };

    return (
        <div className="App">
            <Grid centered columns={2} stackable >
                <Grid.Row>
                    <Grid.Column className="nomination-container" id="fonts" width={4} height={10}>
                            {nominations.length <= 0 ? (
                                <div className="nomination">Search movies to add nominations</div>
                            ) : (
                                nominations.map((movie, index) => (
                                    <Nomination key={`${index}-${movie.Title}`} movie={movie} deleteNomination={deleteNomination}/>
                                ))
                            )}
                    </Grid.Column>

                    <Grid.Column width={12}> 
                        <Searchbar search={search} loading={loading}/>
                        { nominations.length >=5 &&
                            <Message
                                info
                                header='5 nominations have been made'
                                content="Roll out the red carpet!"
                            />
                        }   
                        <div>
                            {errorMessage ? (
                                <div className="errorMessage"><h1 id='fonts'>{errorMessage}</h1></div>
                            ) : (
                                movies.map((movie, index) => (
                                    <Movie key={`${index}-${movie.Title}`} movie={movie} nominate={nominate} nominations={nominations} />
                                ))
                            )}
                        </div>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    );
    
}
export default Dashboard;
