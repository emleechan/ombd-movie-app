import React, {useState, useEffect, useLayoutEffect} from 'react';
import './Dashboard.css';
import Movie from "./Movie";
import Searchbar from "./Searchbar";
import Nomination from "./Nomination";
import { Grid, Segment, Message } from 'semantic-ui-react'

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [nominations, setNomination] = useState([]);
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
        });
    };

    const nominate = (movie) => {
        setNomination([...nominations, movie])
    };

    const deleteNomination = (imdbID) => {
        setNomination(nominations.filter(movie => movie.imdbID !== imdbID))
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
