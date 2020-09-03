import React, {useState, useEffect, useLayoutEffect} from 'react';
import './Dashboard.css';
import Movie from "../Movie/Movie";
import Searchbar from "../Searchbar/Searchbar";
import Nomination from "../Nomination";
import { Grid, Segment, Message } from 'semantic-ui-react'

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
            console.log(jsonResponse)
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
        console.log(newNomination)
        localStorage.setItem("localStorage", JSON.stringify(newNomination));
    };

    const deleteNomination = (imdbID) => {
        const newNomination = nominations.filter(movie => movie.imdbID !== imdbID);
        setNomination(newNomination);
        localStorage.setItem("localStorage", JSON.stringify(newNomination));
    };

    return (
        <div className="App">
            <Grid centered columns={1}>
                <Grid.Column>
                    <Searchbar search={search} loading={loading}/>   
                </Grid.Column>
                { nominations.length >=5 &&
                    <Grid.Column>
                        <Message
                            info
                            header='5 nominations have been made!'
                            content="Congrats"
                        />
                    </Grid.Column>
                }
                <Grid.Row>
                    <Grid.Column width={10}>
                            <div>
                                {errorMessage ? (
                                    <div className="errorMessage">{errorMessage}</div>
                                ) : (
                                    movies.map((movie, index) => (
                                        <Movie key={`${index}-${movie.Title}`} movie={movie} nominate={nominate} nominations={nominations} />
                                    ))
                                )}
                            </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            {nominations.length <= 0 ? (
                                <div>There are no nominations</div>
                            ) : (
                                nominations.map((movie, index) => (
                                    <Nomination key={`${index}-${movie.Title}`} movie={movie} deleteNomination={deleteNomination}/>
                                ))
                            )}
                        </Segment> 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
    
}
export default Dashboard;
