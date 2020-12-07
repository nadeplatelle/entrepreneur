import React, {useState} from 'react';
import firebaseApp  from './firebase'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'
import JobTypeCombo from './components/JobTypeCombo'
import BuildCombo from './components/BuildCombo'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    marginTop: 15,
    width: 260,
  },
}));



export default function CreateJobDialog({ id, bldg, invBy, jType, tQuoted, tSpent, tPrice, dQuoted, dInvoiced, mNotes }) {
 
    const [building, setBuilding] = useState(bldg);
    const [invoicedBy, setInvoicedBy] = useState(invBy);
    const [jobType, setJobType] = useState(jType);
    const [timeQuoted, setTimequoted] = useState(tQuoted);
    const [timeSpent, setTimespent] = useState(tSpent);
    const [totalPrice, setTotalprice] = useState(tPrice);
    const [dateQuoted, setDatequoted] = useState(dQuoted);
    const [dateInvoiced, setDateinvoiced] = useState(dInvoiced);
    const [materialsNotes, setMaterialsnotes] = useState(mNotes);

    const InvBy = [
      { "name": "Tekvision" },
      { "name": "Absolute Fire" }]
    

   
   const classes = useStyles();
  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (event) => {
        event.preventDefault()
        const SaveJob = firebaseApp.functions().httpsCallable('Job')
       SaveJob({building: building, 
                 invoicedBy: invoicedBy, 
                 jobType: jobType,
                 timeQuoted: timeQuoted,
                 timeSpent: timeSpent,
                 totalPrice: totalPrice,
                 dateQuoted: dateQuoted,
                 dateInvoiced: dateInvoiced,
                 materialsNotes: materialsNotes
                })
               
 
                setMaterialsnotes('')
     setOpen(false);
   };

  return (
    <div className="Button">
      <Button variant="outlined" color="primary"  onClick={handleClickOpen}>
        Add New Job
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Job</DialogTitle>
        <DialogContent>
          
          <form>
          <BuildCombo handleChange={building => setBuilding(building)} value={bldg} />
          
          <TextField
            margin="dense"
            value={invoicedBy} onChange={(e) => setInvoicedBy(e.target.value)}
            id="invoicedBy"
            label="Invoiced By"
            type="text"
            fullWidth
          />
          <JobTypeCombo handleChange={jobType => setJobType(jobType)} value={jType}/>
      
     
       <TextField
                 id="datequoted"
                 label="Date Quoted"
                 type="date"
                 defaultValue={dateQuoted}
                 className={classes.textField}
                 onChange={(e) => setDatequoted(e.target.value)}
                 InputLabelProps={{
             shrink: true,
             }}
         />
         <TextField
                 id="dateinvoiced"
                 label="Date Invoiced"
                 type="date"
                 defaultValue={dateInvoiced}
                 className={classes.textField}
                 onChange={(e) => setDateinvoiced(e.target.value)}
                 InputLabelProps={{
             shrink: true,
             }}
         />
    
           <TextField
            margin="dense"
            value={timeQuoted} onChange={(e) => setTimequoted(e.target.value)}
            id="timequoted"
            label="Time quoted"
            type="text"
            className={classes.textField}
            fullWidth
          />
           <TextField
            margin="dense"
            value={timeSpent} onChange={(e) => setTimespent(e.target.value)}
            id="timespent"
            label="Time Spent"
            type="text"
            className={classes.textField}
            fullWidth
          />
          <TextField
            margin="dense"
            value={totalPrice} onChange={(e) => setTotalprice(e.target.value)}
            id="totalprice"
            label="Total Price"
            type="text"
            fullWidth
          />
         
          <TextField
            margin="dense"
            value={materialsNotes} onChange={(e) => setMaterialsnotes(e.target.value)}
            id="notes"
            label="notes"
            type="text"
            fullWidth
            multiline
            rows="3"
          />
         

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}