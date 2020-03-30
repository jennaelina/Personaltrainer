import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
//import App from '../App.js';



import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

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






export default function Trainingswithcustomerslist (){
   const [trainings, setTrainings] = useState([]);
   const classes = useStyles();
  
   useEffect(()=> fetchData(), []);

   const fetchData = ()=> {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))

    }

  



    const columns = [
        {
            Header: 'Date',
            id: 'date', 
            accessor: 'date',
            Cell: row => {
                if(row.value) {
                return Moment(row.value).format('LLL')
                } else {
                return 'Incomplete'
                }
                }
       
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer firstname',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Customer lastname',
            accessor: 'customer.lastname'
        },
        {
            Header: 'Customer id',
            accessor: 'customer.id'
        }
        
        
      
   
    ] 
    // <App treenit={treenit} data={trainings}/> 
   /* const treenit = [
    
        {
            start: 'date',
            title: 'activity'
        }
    ]*/
    return (
        <div>

            
    <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar >
         
        
          <Typography variant="h6" className={classes.title}>

            Trainings and customers
          </Typography>
         
        </Toolbar>
      </AppBar>
           <Button style= {{margin: 10}} variant="outlined" color="primary" onClick={fetchData}>
        update list
      </Button>
            <ReactTable filterable={true} data={trainings} columns={columns} />
           
           
           
     
        </div>
    )
}