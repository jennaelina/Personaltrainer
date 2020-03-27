import React, {useState, useEffect} from 'react';
import Customerlist from'./components/Customerlist';
import Traininglist from'./components/Traininglist';
import Trainingswithcustomerslist from'./components/Trainingswithcustomerslist';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

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

function App() {
  const classes = useStyles();

 
  const [trainings, setTrainings] = useState([]);
  const [calenderevent, setCalenderevent] = useState([{ title: '', date: '' }]);
 

   
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

    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >


        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
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

    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >
         
         
          <Typography variant="h5" >

            Training calender
          </Typography>
         
        </Toolbar>
      </AppBar>
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={calenderevent}
      />
    
    <Button style= {{margin: 10}} variant="outlined" color="primary" onClick={fetchData}>
            update calendar
         </Button>
    </div>
  );
}

export default App;
