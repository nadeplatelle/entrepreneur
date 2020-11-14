import React from 'react'
import './Navigation.css'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {Card} from '@material-ui/core'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

function Navigation() {
    const classes = useStyles();
    return (
        <div className="Navigation">
          <Card class="card">
           <PeopleIcon/>
           <Link to="/customers" class="link">Customers</Link>
           </Card>
           <Card class="card">
           <WorkIcon/>
           <Link to="/Jobs" class="link">Jobs</Link>
           </Card>
           <Card class="card">
           <AddShoppingCartIcon/>
           <Link to="/suppliers" class="link">Suppliers</Link>
           </Card>
           <Card class="card">
           <CreditCardIcon/>
           <Link to="/expenses" class="link">Expenses</Link>
           </Card>
           <Card class="card">
           <ScheduleIcon/>
           <Link to="/schedule" class="link">Schedule</Link>
           </Card>
           <Card class="card">
           <AssignmentTurnedInIcon/>
           <Link to="/Reminders" class="link">Reminders</Link>
           </Card>
        </div>
    )
}

export default Navigation
