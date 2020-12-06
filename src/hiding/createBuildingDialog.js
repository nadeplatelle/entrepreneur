import React, {useState, useEffect} from 'react';
import firebaseApp, {db} from './firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropdown from "./dropdown";
import EditCustomerDialog from './CompanyDialog'
import './display.css'


export default function BuildingDialog() {
   
    const [name, setName] = useState(null);
    const [address, setAddress] = useState("");
    const [customer, setCustomer] = useState("");
    const [invoiceToname, setInvoicetoname] = useState("");
    const [invoiceToemail, setInvoicetoemail] = useState("");
    const [buildingNotes, setBuildingnotes]= useState("");
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([])
  
    useEffect(() => {
        db.collection('Customers').onSnapshot(snapshot => {
          setCustomers(snapshot.docs.map(doc => ({
            id: doc.id,
            customer: doc.data().name 
           })) )
        })
     }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (event) => {
        event.preventDefault()
        const SaveBuilding = firebaseApp.functions().httpsCallable('Building')
       SaveBuilding({name: name, 
                    address: address, 
                    customer: customer,
                    invoiceToname: invoiceToname,
                    invoiceToemail: invoiceToemail,
                    buildingNotes: buildingNotes
                })
                setName('')
                setAddress('')
                setCustomer('')
                setInvoicetoname('')
                setInvoicetoemail('')
                setBuildingnotes('')
     setOpen(false);
   };

  return (
    <div className="Button">
      <Button variant="outlined" color="primary"  onClick={handleClickOpen}>
        Add New Building
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Building</DialogTitle>
        <DialogContent>
          
          <DialogActions>
          <EditCustomerDialog functionname={'Customer'} id ='' title ='' subheader = '' emailadd = '' phonenum = '' notes2 = ''/>
          </DialogActions>
          <form>
        
          <TextField
            autoFocus
            margin="dense"
            value={name} onChange={(e) => setName(e.target.value)}
            id="name"
            label="Building name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={address} onChange={(e) => setAddress(e.target.value)}
            id="address"
            label="Address"
            type="text"
            fullWidth
          />
            <Dropdown
                 className="dropdown"
                 prompt='Select customer...'
                 options={customers}
                 id='id'
                 label='customer'
                 value={customer}
                 onChange={(val) => setCustomer(val)}
      /> 
  
           <TextField
            margin="dense"
            value={invoiceToname} onChange={(e) => setInvoicetoname(e.target.value)}
            id="invoiceToname"
            label="Invoice To Name"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={invoiceToemail} onChange={(e) => setInvoicetoemail(e.target.value)}
            id="invoiceToemail"
            label="Invoice To Email"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={buildingNotes} onChange={(e) => setBuildingnotes(e.target.value)}
            id="buildingNotes"
            label="Building Notes"
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