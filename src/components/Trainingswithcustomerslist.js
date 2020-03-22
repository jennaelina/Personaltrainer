import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button';






export default function Trainingswithcustomerslist (){
   const [trainings, setTrainings] = useState([]);
   
  
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
    return (
        <div>
           <Button style= {{margin: 10}} variant="outlined" color="primary" onClick={fetchData}>
        update list
      </Button>
            <ReactTable filterable={true} data={trainings} columns={columns} />
           
           
       
     
        </div>
    )
}