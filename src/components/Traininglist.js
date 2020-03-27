import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import Addtraining from'./Addtraining'
import Edittraining from'./Edittraining'




export default function Customerlist (){
   const [trainings, setTrainings] = useState([]);
   const [open, setOpen] = useState(false);
  
   useEffect(()=> fetchData(), []);

   const fetchData = ()=> {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTrainings(data.content))

    }

    const deleteTraining = (link)  => {
        if (window.confirm('Are you sure you want to delete? ')){ 
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpen(true);
        }
            

    }
  /*  const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
 
    
    }*/

    const updateTraining = (training, link) => {

        fetch(link, {

            method: 'PUT', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    const columns = [
        {
            Header: 'Date',
            id: 'datetime-local', 
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
            

            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Edittraining updateTrainingr={updateTraining} training ={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size="small" color ="secondary" onClick={()=> deleteTraining(row.value)}>Delete</Button>


        }
        
      
   
    ]    
    return (
        <div>

         <Button style= {{margin: 10}} variant="outlined" color="primary" onClick={fetchData}>
            update list
         </Button>
           
           
           
            <ReactTable filterable={true} data={trainings} columns={columns} />
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Training deleted"
                action={
                <React.Fragment>
                <Button color="secondary" size="small" onClick={handleClose}>
                    OK
                </Button>
                
                    
                
            </React.Fragment>
        }
      />
           
           
       
     
        </div>
    )
}