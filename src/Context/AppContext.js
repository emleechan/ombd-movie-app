import React, { createContext, useState } from 'react';

const AppContext = createContext([{}, () => {}]);

const AppContextProvider = (props) => {
    const [state, setState] = useState({
        loading: false,
        movies: [],
        nominations: JSON.parse(localStorage.getItem("localStorage")) || [],
        errorMessage: ''
      });

    return(
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );
}

export  {AppContext, AppContextProvider}; 