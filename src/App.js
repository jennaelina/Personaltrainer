import React, {useState, useEffect} from 'react';
import Customerlist from'./components/Customerlist';
import Traininglist from'./components/Traininglist';
import Calendar from'./components/Calendar';
import Trainingswithcustomerslist from'./components/Trainingswithcustomerslist';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link as Links } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

//import Link from '@material-ui/core/Link';


import "./index.css";
import { render } from "react-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from 'moment';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


import './App.css';
const events = [{ title: "today's event", date: new Date() }];


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const useStyles12 = makeStyles({
  root: {
    fontFamily: "sans-serif",
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
   // border: 0,
   // borderRadius: 3,
   // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#2E3B55',
    height: 48,
    //padding: '0 30px',
  },
});

function App() {
  const classes = useStyles();

  const classes12 = useStyles12();
  const [trainings, setTrainings] = useState([]);
  const [calenderevent, setCalenderevent] = useState([{ title: '', date: '' }]);
  const [open, setOpen] = useState(false);

  
 

   
    useEffect(()=> fetchData(), []);
 
    const fetchData = ()=> {
      fetch('https://customerrest.herokuapp.com/gettrainings')
     .then(response => response.json())
  
  .then(data=>{let teamsFromApi = data.map(person => {
    return {title: person.activity + "/" + person.customer.firstname + " " + person.customer.lastname, start: moment(person.date).format(), end:moment(person.date).add(person.duration, 'm').format()}
  });


  data.map((person) =>
     setCalenderevent([{
      title: '', date: ''
    }].concat(teamsFromApi))
  )})
  .catch(error => console.log(error));
     }

     
  

     
    
 
  return (
    <div className={classes.root}>
       <BrowserRouter>

       <div className="header" >
      </div>
      <h1 className={classes12.root}>Personaltrainer app</h1>
      <div>
        <Link to= "/" style={{ fontSize: 'large', fontFamily: "sans-serif", color: '#2E3B55', textDecoration: 'none' }}>Customerlist</Link>{' '}
        
        <Link to=  "/components/Traininglist" style={{marginBottom: '30px',marginLeft: '40px',fontSize: 'large', fontFamily: "sans-serif", color: '#2E3B55', textDecoration: 'none' }} >Traininglist</Link>{' '}
        <Link to=  "/components/Trainingswithcustomerslist" style={{marginLeft: '40px',fontSize: 'large', fontFamily: "sans-serif", color: '#2E3B55', textDecoration: 'none' }}>Trainings with customers</Link>{' '}
        <Link to=  "/components/Calendar" style={{marginLeft: '40px',fontSize: 'large', fontFamily: "sans-serif", color: '#2E3B55', textDecoration: 'none' }}>Calendar</Link>{' '}
       
        <Switch>
        <Route exact path="/" component={Customerlist}/>
        <Route path="/components/Traininglist" component={Traininglist}/>
        <Route path="/components/Customerlist"component={Customerlist}/>
        <Route path="/components/Calendar"component={Calendar}/>
        <Route path="/components/Trainingswithcustomerslist"component={Trainingswithcustomerslist}/>
        <Route path="/components/Trainingswithcustomerslist"render={() => <h1>Contact address</h1>}/>
        <Route render={() => <h1></h1>}/>
        </Switch>
        </div>











         </BrowserRouter>
    </div>
  );
}

export default App;
