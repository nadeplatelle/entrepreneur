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


export default function CompanyDialog({functionname, heading, id, title, subheader, emailadd, phonenum, notes2}) {
  
    const [name, setName] = useState(title);
const [contact, setContact] = useState(subheader);
const [email, setEmail] = useState(emailadd);
const [phone, setPhone] = useState(phonenum);
const [notes, setNotes] = useState(notes2);
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

        EditRecord({id: id,
                    name: name, 
                      contact: contact, 
                      email: email,
                      phone: phone,
                      notes: notes
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