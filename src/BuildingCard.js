import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Card.css'
import CustomizedMenus from './PopupMenu'
import {db} from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import BuildingDialog from './BuildingDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    margin: 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function BuildingCard({id, name, customer, address, invoiceToname, invoiceToemail, buildingNotes}) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const DeleteMe = () => {
      db.collection('Buildings').doc(id).delete();
    } 
  
    return (
      <Card className={classes.root}>
        <CardHeader
       
          action={
            <IconButton aria-label="settings">
              <CustomizedMenus />
            </IconButton>
          }
          title={name}
          subheader={customer}
        />
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Address:  {address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Invoice to name:  {invoiceToname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Invoice to email:  {invoiceToemail}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <BuildingDialog functionname="EditBuilding" id={id} heading="Edit Building" bldgname={name} bldgcustomer={customer} bldgaddress={address} bldginvoiceToname={invoiceToname} bldginvoiceToemail={invoiceToemail} bldgNotes={buildingNotes}/>
          <IconButton aria-label="Delete" onClick={DeleteMe} >
          <DeleteIcon/>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Notes:</Typography>
            <Typography paragraph>
              {buildingNotes}
            </Typography>
          
          </CardContent>
        </Collapse>
      </Card>
    );
  }