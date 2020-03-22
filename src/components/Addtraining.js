import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export default function Addtraining(props){
  
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
    date: '', duration: '', activity: '', customer: ''
    })
    const handleClickOpen = () => {
        console.log(props.training);
        setTraining({customer: props.training.links[0].href})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event)=>{
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }
   
    
      const classes = useStyles();

    return(
        <div>
        <Button style= {{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          
        <form className={classes.container} noValidate>
        <TextField


            autoFocus
            id="datetime-local"

            type="datetime-local"
            defaultValue="2020-03-24T10:30"
            className={classes.textField}
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="Date and time"
           
            fullWidth
          />
           </form>


          
        <TextField
            
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
           
            fullWidth
          />

          
        <TextField
          
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
           
            fullWidth
          />

        <TextField
           
           margin="dense"
           name="customer"
           value={training.customer}
           onChange={e => handleInputChange(e)}
           label="Customer"
          
           fullWidth
         />


          
       

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}