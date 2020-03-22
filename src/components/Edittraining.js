import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

export default function Edittraining(props){

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', activity: '', duration: '', customer: ''
})
    const handleClickOpen = () => {
       console.log(props.training);
       setTraining({date: props.training.date, activity: props.training.activity, duration: props.training.duration })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event)=>{
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const updateTrainingr = () => {
        props.updateTrainingr(training, props.training.links[0].href);
        handleClose();
    }

    return(
        <div>
        <Button color="primary" onClick={handleClickOpen}>
        Edit 
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
        <DialogContent>
         
        <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="Date"
           
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
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
           
            fullWidth
          />

      

          
       

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTrainingr} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}