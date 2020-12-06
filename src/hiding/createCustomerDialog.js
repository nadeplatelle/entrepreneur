import React, {useState} from 'react';
import firebaseApp from './firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './display.css'


export default function FormDialog({functionname}) {
    const [name, setName] = useState("");
const [contact, setContact] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (event) => {
        event.preventDefault()
        const SaveCustomer = firebaseApp.functions().httpsCallable(functionname)
       SaveCustomer({name: name, 
                    contact: contact, 
                    email: email,
                    phone: phone,
                    notes: notes
                })
                setName('')
                setContact('')
                setEmail('')
                setPhone('')
                setNotes('')
     setOpen(false);
   };

  return (
    <div className="Button">
      <Button variant="outlined" color="primary"  onClick={handleClickOpen}>
        Add New {functionname}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Add details of the new Customer
          </DialogContentText>
          <form>
          <TextField
            autoFocus
            margin="dense"
            value={name} onChange={(e) => setName(e.target.value)}
            id="name"
            label="Business name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={contact} onChange={(e) => setContact(e.target.value)}
            id="contact"
            label="Contact Person"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={email} onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
           <TextField
            margin="dense"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            id="phone"
            label="Phone number"
            type="text"
            fullWidth
          />
           <TextField
            margin="dense"
            value={notes} onChange={(e) => setNotes(e.target.value)}
            id="notes"
            label="Notes"
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