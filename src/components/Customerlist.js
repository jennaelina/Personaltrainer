import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from'./Addcustomer'
import Editcustomer from './Editcustomer';
import Addtraining from'./Addtraining'



export default function Customerlist (){
   const [customers, setCustomers] = useState([]);
   const [open, setOpen] = useState(false);
  
   useEffect(()=> fetchData(), []);

   const fetchData = ()=> {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))

    }

    const deleteCustomer = (link)  => {
        if (window.confirm('Are you sure? ')){ 
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            setOpen(true);
        }
            

    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
 
    
    }

    const updateCustomer = (customer, link) => {

        fetch(link, {

            method: 'PUT', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }



    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
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
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {

            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer ={row.original} />
        },

        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button size="small" color ="secondary" onClick={()=> deleteCustomer(row.value)}>Delete</Button>


        },
        {

            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Addtraining saveTraining={saveTraining} training ={row.original} />
        }
     
   
    ]    
    return (
        <div>
            <Addcustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />

            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Customer deleted"
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


