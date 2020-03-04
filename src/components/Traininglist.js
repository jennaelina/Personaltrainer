import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import'react-table/react-table.css';
import Moment from 'moment';


export default function Customerlist (){
   const [trainings, setTrainings] = useState([]);
  
   useEffect(()=> fetchData(), []);

   const fetchData = ()=> {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTrainings(data.content))

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
        
      
   
    ]    
    return (
        <div>
           
            <ReactTable filterable={true} data={trainings} columns={columns} />
           
           
       
     
        </div>
    )
}