import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebaseApp from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'
import BuildCombo from './components/BuildCombo'
import JobTypeCombo from './components/JobTypeCombo';
import {MenuItem} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import {Tooltip} from '@material-ui/core'

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


export default function JobDialog({ id, functionname, bldg, invBy, jType, tQuoted, tSpent, tPrice, dQuoted, dInvoiced, mNotes }) {
    const [building, setBuilding] = useState(bldg);
    const [invoicedBy, setInvoicedBy] = useState(invBy);
    const [jobType, setJobType] = useState(jType);
    const [timeQuoted, setTimeQuoted] = useState(tQuoted);
    const [timeSpent, setTimeSpent] = useState(tSpent);
    const [totalPrice, setTotalPrice] = useState(tPrice);
    const [dateQuoted, setDateQuoted] = useState(dQuoted);
    const [dateInvoiced, setDateInvoiced] = useState(dInvoiced);
    const [materialsNotes, setMaterialsNotes] = useState(mNotes);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (event) => {
        event.preventDefault()
        const EditRecord = firebaseApp.functions().httpsCallable(functionname)

        EditRecord({                        id: id,
                                            building: building,
                                            jobType: jobType,
                                            invoicedBy:invoicedBy,
                                            timeQuoted: timeQuoted,
                                            timeSpent: timeSpent,
                                            totalPrice: totalPrice, 
                                            dateQuoted: dateQuoted,
                                            dateInvoiced: dateInvoiced,
                                            materialsNotes: materialsNotes
                                           })
  
     setOpen(false);
   };
      
 


  return (
    <div className="Button">
    
        <IconButton aria-label="Edit" onClick={handleClickOpen}>
        {functionname.substring(0, 3)==='Edi'?<Tooltip title="Edit"><EditIcon/></Tooltip>:<Tooltip title="Add new"><AddIcon/></Tooltip>}
          </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Job</DialogTitle>
        <DialogContent>
          <form>
          <BuildCombo handleChange={building => setBuilding(building)} value={bldg} />
          
          <TextField
            margin="dense"
            value={invoicedBy} onChange={(e) => setInvoicedBy(e.target.value)}
            id="invoicedBy"
            label="Invoiced By"
            select
            fullWidth            
          >
            <MenuItem key="Tekvision"value="Tekvision">
              Tekvision
            </MenuItem>
            <MenuItem key="Absolute Fire"value="Absolute Fire">
              Absolute Fire
            </MenuItem>
            </TextField>

          <JobTypeCombo handleChange={jobType => setJobType(jobType)} value={jType}/>

           <TextField
            margin="dense"
            value={timeQuoted} onChange={(e) => setTimeQuoted(e.target.value)}
            id="timeQuoted"
            label="Time Quoted"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)}
            id="timeSpent"
            label="Time Spent"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)}
            id="totalPrice"
            label="Total Price"
            type="text"
            fullWidth
          />
            <TextField
                 id="datequoted"
                 label="Date Quoted"
                 type="date"
                 defaultValue={dateQuoted}
                 className={classes.textField}
                 onChange={(e) => setDateQuoted(e.target.value)}
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
                 onChange={(e) => setDateInvoiced(e.target.value)}
                 InputLabelProps={{
             shrink: true,
             }}
         />
           <TextField
            margin="dense"
            value={materialsNotes} onChange={(e) => setMaterialsNotes(e.target.value)}
            id="notes"
            label="Material Notes"
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


// building: building, 
//                                             invoicedBy: invoicedBy, 
//                                             jobType: jobType,