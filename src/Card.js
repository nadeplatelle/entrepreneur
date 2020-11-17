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
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Card.css'
import CustomizedMenus from './PopupMenu'
import {db} from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import EditDialog from './EditDialog'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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


export default function RecipeReviewCard({type, id, title, subheader, email, phone, notes}) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const DeleteMe = () => {
      db.collection(type).doc(id).delete();
    } 
  
    return (
      <Card className={classes.root}>
        <CardHeader
       
          action={
            <IconButton aria-label="settings">
              <CustomizedMenus />
            </IconButton>
          }
          title={title}
          subheader={subheader}
        />
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Email:  {email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone:  {phone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <EditDialog type = {type} id={id} title={title} subheader={subheader} emailadd={email} phonenum={phone} notes2={notes}/>
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
              {notes}
            </Typography>
          
          </CardContent>
        </Collapse>
      </Card>
    );
  }