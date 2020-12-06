import React, {useState, useEffect} from 'react';
import firebaseApp, {db} from './firebase'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'
import Dropdown from "./dropdown";
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



export default function CreateJobDialog() {
  const [buildings, setBuildings] = useState([])
    const [building, setBuilding] = useState(null);
    const [invoicedBy, setInvoicedby] = useState("");
    const [jobType, setJobtype] = useState("");
    const [timeQuoted, setTimequoted] = useState("");
    const [timeSpent, setTimespent] = useState("");
    const [totalPrice, setTotalprice] = useState("");
    const [dateQuoted, setDatequoted] = useState(null);
    const [dateInvoiced, setDateinvoiced] = useState(null);
    const [materialsNotes, setMaterialsnotes] = useState("");
    const InvBy = [
      { "name": "Tekvision" },
      { "name": "Absolute Fire" }]
    const JobTyp = [
      { "name": "Fire Installation", "code": "FI" },
      { "name": "Fire Service", "code": "FS" },
      { "name": "Gate Repair", "code": "GR" },
      { "name": "Network Cabling", "code": "NC" },
      { "name": "Intercom Installation", "code": "II" },
      { "name": "Other", "code": "O" }
    ]

    useEffect(() => {
      db.collection('Buildings').onSnapshot(snapshot => {
        setBuildings(snapshot.docs.map(doc => ({
          id: doc.id,
          building: doc.data().name 
         })) )
      })
   }, [])
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
                setInvoicedby('')
                setJobtype('')
                setTimequoted('')
                setTimespent('')
                setTotalprice('')
 
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
        
       <Dropdown
        className="dropdown"
        prompt='Select building...'
        options={buildings}
        id='id'
        label='building'
        value={building}
        onChange={(val) => setBuilding(val)}
      /> 
       <Dropdown
       className="dropdown"
        prompt='Select Invoiced by...'
        options={InvBy}
        id='code'
        label='name'
        value={invoicedBy}
        onChange={(val) => setInvoicedby(val)}
      /> 
       <Dropdown
       className="dropdown"
        prompt='Select Job Type...'
        options={JobTyp}
        id='code'
        label='name'
        value={jobType}
        onChange={(val) => setJobtype(val)}
      /> 
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