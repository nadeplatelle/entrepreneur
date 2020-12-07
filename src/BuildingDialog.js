import React, {useState} from 'react';
import firebaseApp from './firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'
import {Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CustCombo from './components/CustCombo'




export default function BuildingDialog({functionname, heading, id, bldgname, bldgcustomer, bldgaddress, 
  bldginvoiceToname, bldginvoiceToemail, bldgNotes}) {
    
    const [name, setName] = useState(bldgname);
    const [customer, setCustomer] = useState(bldgcustomer);
    const [address, setAddress] = useState(bldgaddress);
    const [invoiceToname, setInvoicetoname] = useState(bldginvoiceToname);
    const [invoiceToemail, setInvoicetoemail] = useState(bldginvoiceToemail);
    const[buildingNotes, setBuildingnotes] = useState(bldgNotes)
    const [open, setOpen] = React.useState(false);



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
                                            name: name, 
                                            customer: customer, 
                                            address: address,
                                            invoiceToname: invoiceToname,
                                            invoiceToemail: invoiceToemail,
                                            buildingNotes: buildingNotes
                                           })
  
     setOpen(false);
   };
      
 


  return (
    <div className="Button">
      
        <IconButton aria-label="Edit" onClick={handleClickOpen}>
        {functionname.substring(0, 3)==='Edi'?<Tooltip title="Edit"><EditIcon/></Tooltip>:<Tooltip title="Add new"><AddIcon/></Tooltip>}
          </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{heading}</DialogTitle>
        <DialogContent>
      
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
           <CustCombo handleChange={customer => setCustomer(customer)} value={bldgcustomer}/>
         
          <TextField
            margin="dense"
            value={address} onChange={(e) => setAddress(e.target.value)}
            id="address"
            label="Address"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={invoiceToname} onChange={(e) => setInvoicetoname(e.target.value)}
            id="invoicetoname"
            label="Invoice to name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={invoiceToemail} onChange={(e) => setInvoicetoemail(e.target.value)}
            id="invoicetoemail"
            label="Invoice to email"
            type="email"
            fullWidth
          />
           <TextField
            margin="dense"
            value={buildingNotes} onChange={(e) => setBuildingnotes(e.target.value)}
            id="buildingNotes"
            label="Building notes"
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