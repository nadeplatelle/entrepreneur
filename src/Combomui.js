import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {db} from './firebase'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}));

export default function MultilineTextFields(props) {
    const classes = useStyles();

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState("")

    useEffect(() => {
        db.collection('Customers').orderBy('name').onSnapshot(snapshot => {
          setCustomers(snapshot.docs.map(doc => ({
            id: doc.id,
            customer: doc.data(),
            customername: doc.data().name
           })) )
        })
     }, [])

   const change = (event) => {
     setCustomer(event.target.value);
   };

  console.log(customers)
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="Customer"
          select
          label="Customer"
          fullwidth
          value={customer}
           onChange={(event) =>{ change(event); props.handleChange(event.target.value)}}
          helperText="Please select the customer"
        >
          {customers.map((option) => (
            <MenuItem key={option.customername}value={option.customername}>
              {option.customername}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </form>
  );
}
