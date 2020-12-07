
import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


  const JobTyp = [
    { "name": "CCTV Installation" },
    { "name": "CCTV Service" },
    { "name": "Fire Installation" },
    { "name": "Fire Service" },
    { "name": "Gate Repair"},
    { "name": "Network Cabling" },
    { "name": "Intercom Installation" },
    { "name": "Other" }
  ]



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '15',
      width: '64ch',
    },
  },
}));

export default function JobTypeCombo(props) {
    const classes = useStyles();

    const [jobTypes, setJobTypes] = useState(JobTyp)
    const [jobType, setJobType] = useState(props.value)

   

   const change = (event) => {
     setJobType(event.target.value);
   };


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="jobType"
          select
          label="Job Type"
          value={jobType}
           onChange={(event) =>{ change(event); props.handleChange(event.target.value)}}
        >
          {jobTypes.map((option) => (
            <MenuItem key={option.name}value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </form>
  );
}
