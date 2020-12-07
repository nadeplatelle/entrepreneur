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

    const [buildings, setBuildings] = useState([])
    const [building, setBuilding] = useState(props.value)

    useEffect(() => {
        db.collection('Buildings').orderBy('name').onSnapshot(snapshot => {
          setBuildings(snapshot.docs.map(doc => ({
            id: doc.id,
            building: doc.data(),
            buildingname: doc.data().name
           })) )
        })
     }, [])

   const change = (event) => {
     setBuilding(event.target.value);
   };


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="Customer"
          select
          label="Building"
          value={building}
           onChange={(event) =>{ change(event); props.handleChange(event.target.value)}}
        >
          {buildings.map((option) => (
            <MenuItem key={option.buildingname}value={option.buildingname}>
              {option.buildingname}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </form>
  );
}
