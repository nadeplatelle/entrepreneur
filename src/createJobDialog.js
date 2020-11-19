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
  const [customers, setCustomers] = useState([])
    const [value, setValue] = useState(null);
    const [invoicedby, setInvoicedby] = useState(null);
    const [jobtype, setJobtype] = useState(null);
    const [timequoted, setTimequoted] = useState("");
    const [timespent, setTimespent] = useState("");
    const [totalprice, setTotalprice] = useState("");
    const [datequoted, setDatequoted] = useState("");
    const [dateInvoiced, setDateinvoiced] = useState("");
    const [materialnotes, setMaterialnotes] = useState("");
    const InvBy = [
      { "name": "Tekvision", "code": "TK" },
      { "name": "Absolute Fire", "code": "AB" }]
    const JobTyp = [
      { "name": "Fire Installation", "code": "FI" },
      { "name": "Fire Service", "code": "FS" },
      { "name": "Gate Repair", "code": "GR" },
      { "name": "Network Cabling", "code": "NC" },
      { "name": "Intercom Installation", "code": "II" },
      { "name": "Other", "code": "O" }
    ]

    useEffect(() => {
      db.collection('Customers').onSnapshot(snapshot => {
        setCustomers(snapshot.docs.map(doc => ({
          id: doc.id,
          customer: doc.data().name 
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
        const SaveJob = firebaseApp.functions().httpsCallable('SaveJob')
       SaveJob({customer: value, 
                 invoicedby: invoicedby, 
                 jobtype: jobtype,
                 timequoted: timequoted,
                 timespent: timespent,
                 totalprice: totalprice,
                 datequoted: datequoted,
                 dateInvoiced: dateInvoiced,
                 materialnotes: materialnotes
                })
                setInvoicedby('')
                setJobtype('')
                setTimequoted('')
                setTimespent('')
                setTotalprice('')
                setDatequoted('')
                setDateinvoiced('')
                setMaterialnotes('')
     setOpen(false);
   };

  return (
    <div className="Button">
      <Button variant="outlined" color="primary"  onClick={handleClickOpen}>
        Add New 
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Job</DialogTitle>
        <DialogContent>
          
          <form>
        
       <Dropdown
        className="dropdown"
        prompt='Select customer...'
        options={customers}
        id='id'
        label='customer'
        value={value}
        onChange={(val) => setValue(val)}
      /> 
       <Dropdown
       className="dropdown"
        prompt='Select Invoiced by...'
        options={InvBy}
        id='code'
        label='name'
        value={invoicedby}
        onChange={(val) => setInvoicedby(val)}
      /> 
       <Dropdown
       className="dropdown"
        prompt='Select Job Type...'
        options={JobTyp}
        id='code'
        label='name'
        value={jobtype}
        onChange={(val) => setJobtype(val)}
      /> 
       <TextField
                 id="datequoted"
                 label="Date Quoted"
                 type="date"
                 defaultValue="2020-05-24"
                 className={classes.textField}
                 InputLabelProps={{
             shrink: true,
             }}
         />
         <TextField
                 id="dateinvoiced"
                 label="Date Invoiced"
                 type="date"
                 defaultValue="2020-05-24"
                 className={classes.textField}
                 InputLabelProps={{
             shrink: true,
             }}
         />
    
           <TextField
            margin="dense"
            value={timequoted} onChange={(e) => setTimequoted(e.target.value)}
            id="timequoted"
            label="Time quoted"
            type="text"
            className={classes.textField}
            fullWidth
          />
           <TextField
            margin="dense"
            value={timespent} onChange={(e) => setTimespent(e.target.value)}
            id="timespent"
            label="Time Spent"
            type="text"
            className={classes.textField}
            fullWidth
          />
          <TextField
            margin="dense"
            value={totalprice} onChange={(e) => setTimespent(e.target.value)}
            id="totalprice"
            label="Total Price"
            type="text"
            fullWidth
          />
         
          <TextField
            margin="dense"
            value={materialnotes} onChange={(e) => setMaterialnotes(e.target.value)}
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