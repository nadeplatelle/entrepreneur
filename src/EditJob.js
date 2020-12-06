import React, {useState} from 'react';
import {db} from './firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'


export default function EditJob({ id, bldg, invBy, jType, tQuoted, tSpent, tPrice, dQuoted, dInvoiced, mNotes }) {
    // const [buildings, setBuildings] = useState([])
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   // console.log (name, contact)
    setOpen(false);
  };
  const handleSave = (event) => {
        event.preventDefault()
       
        db.collection('Jobs').doc(id).update({
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
          <EditIcon/>
          </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Job</DialogTitle>
        <DialogContent>
          <form>
          <TextField
            margin="dense"
            value={building} onChange={(e) => setBuilding(e.target.value)}
            id="building"
            label="Building"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={invoicedBy} onChange={(e) => setInvoicedBy(e.target.value)}
            id="invoicedBy"
            label="Invoiced By"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={jobType} onChange={(e) => setJobType(e.target.value)}
            id="jobType"
            label="Job Type"
            type="text"
            fullWidth
          />
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
            margin="dense"
            value={dateQuoted} onChange={(e) => setDateQuoted(e.target.value)}
            id="dateQuoted"
            label="Date Quoted"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={dateInvoiced} onChange={(e) => setDateInvoiced(e.target.value)}
            id="dateInvoiced"
            label="Date Invoiced"
            type="text"
            fullWidth
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