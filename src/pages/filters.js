import React,{useState,useEffect} from 'react';
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
import { Grid } from '@material-ui/core';
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

function Filter(props)
{
    const [Checked, setChecked] = useState([]);
      const handleChange = (value) => {
        const currentIndex=Checked.indexOf(value);
        const newChecked=[...Checked];
        if(currentIndex===-1){
            newChecked.push(value);
        }
        else{
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
      };

      const [c_name, setcompany_list] = useState([]);
      // console.log(companyrole_list);
    
      useEffect(() => {
        axios
          .get("https://mentor-gvpce.herokuapp.com/companies", {
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true
          })
          .then((res) => {
            res.data.forEach((element) => {
              setcompany_list((c_name) => [
                ...c_name,{"name":
                element.company_name}
              ])
            });
          });

      }, []);
    


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
          <p style={{color:"#7700b8"}}>filter by company name</p>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={1}>
          {c_name.map((value,index)=>(
                  <React.Fragment>
                  <Grid item xs={12} md={3} sm={4}>
          <GreenCheckbox checked={Checked.indexOf(value.name)===-1?false:true} onChange={()=>handleChange(value.name)} name="checkedG"/>
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
export default Filter;