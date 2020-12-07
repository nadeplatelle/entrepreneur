import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {db} from '../firebase'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '15',
      width: '64ch',
    },
  },
}));

export default function CustCombo(props) {
    const classes = useStyles();

    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState(props.value)

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
          value={customer}
           onChange={(event) =>{ change(event); props.handleChange(event.target.value)}}
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
