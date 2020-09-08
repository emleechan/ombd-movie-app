import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Dashboard from './Container/Dashboard/Dashboard';
import { AppContextProvider } from './Context/AppContext';

const App = () => {
  return (
    <div>
      <AppContextProvider>
        <Dashboard />
      </ AppContextProvider>
    </div>
  );
}

export default App;
