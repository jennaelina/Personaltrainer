import React from 'react';
import Customerlist from'./components/Customerlist';
import Traininglist from'./components/Traininglist';
import Trainingswithcustomerslist from'./components/Trainingswithcustomerslist';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';


function App() {
  return (
    <div className="App">

    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >
         
         
          <Typography variant="h5" >

            Customers
          </Typography>
         
        </Toolbar>
      </AppBar>

    <Customerlist />
    
    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >
         
         
          <Typography variant="h5" >

            Trainings
          </Typography>
         
        </Toolbar>
      </AppBar>
    <Traininglist />


    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >
         
         
          <Typography variant="h5" >

            Trainings and customers
          </Typography>
         
        </Toolbar>
      </AppBar>
    <Trainingswithcustomerslist />


    </div>
  );
}

export default App;
