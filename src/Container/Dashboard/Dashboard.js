import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Movie from "../../Components/Movie/Movie";
import Searchbar from "../../Components/Searchbar/Searchbar";
import Nomination from "../../Components/Nomination/Nomination";
import { Grid, Segment, Message } from 'semantic-ui-react'
import {MAX_NOMINATIONS} from '../../Constants'
import { AppContext } from '../../Context/AppContext'
import './Dashboard.css';
import '../../Components/Nomination/Nomination.css';

const Dashboard = () => {
    const [state, setState] = useContext(AppContext);
    const { movies, nominations, errorMessage } = state;

    return (
        <div className="App">
            <Grid centered columns={2} stackable >
                <Grid.Row>
                    <Grid.Column className="nomination-container" id="fonts" width={4} height={10}>
                            {nominations.length <= 0 ? (
                                <div className="nomination-title">No Movies Are Nominated</div>
                            ) : (
                                <div>
                                    <div className="nomination-title"><h4 id='fonts'>Nominees</h4></div>
                                    {nominations.map((movie, index) => (
                                        <Nomination key={`${index}-${movie.Title}`} movie={movie} />
                                    ))}
                                </div>
                            )}
                    </Grid.Column>

                    <Grid.Column width={12}> 
                        <Searchbar/>
                        {nominations.length >= MAX_NOMINATIONS &&
                            <Message
                                info
                                header='Max nominations have been made'
                                content="Roll out the red carpet!"
                            />
                        }   
                        <div>
                            {errorMessage ? (
                                <div className="errorMessage"><h1 id='fonts'>{errorMessage}</h1></div>
                            ) : (
                                movies.map((movie, index) => (
                                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
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

Nomination.propTypes = {
     movie: PropTypes.object
}

Movie.propTypes = {
    movie: PropTypes.object
}