import React,{useState,useEffect} from 'react';
import {c_name,c_role,branch} from './data';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
//import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
//import CheckBoxIcon from '@material-ui/icons/Checkbox';
//import Favorite from '@material-ui/icons/Favorite';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Filter1(props)
{
    const [Checked1, setChecked1] = useState([]);
    const handleChange1 = (value) => {
        const currentIndex=Checked1.indexOf(value);
        const newChecked=[...Checked1];
        if(currentIndex===-1){
            newChecked.push(value);
        }
        else{
            newChecked.splice(currentIndex,1);
        }
        setChecked1(newChecked);
        props.handleFilters(newChecked);
      };
      const [c_role, setcompanyrole_list] = useState(new Set());
      const [role,setRole]=useState([])
      useEffect(() => {
        axios
          .get("http://localhost:5005/companies", {
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true
          })
          .then((res) => {
            res.data.forEach((element) => {
              element.company_roles.forEach((value)=>{
                if(!c_role.has(value))
                {
                  setcompanyrole_list(new Set(c_role),c_role.add(value))
                }
              })
            })
            c_role.forEach((value)=>
            setRole((role)=>
            [...role,{"name":value}]))

      })}, []);
    
      const classes=useStyles();
      return(
          <>
          <div className={classes.root}>
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
           <p style={{color:"#7700b8"}}>filter by role in the company</p>
          </AccordionSummary>
          <AccordionDetails>
          <Grid container spacing={1}>
          {role.map((value,index)=>(
                  <React.Fragment>
                  <Grid item xs={6} sm={3}>
          <GreenCheckbox checked={Checked1.indexOf(value.name)===-1?false:true} onChange={()=>handleChange1(value.name)} name="checkedG"/>
          <span style={{color:"#a32173"}}>{value.name}</span>
            </Grid>
      
                  </React.Fragment>
              ))}
              </Grid>
          </AccordionDetails>
          </Accordion>
          </div>
          </>
      )
}

export default Filter1;
