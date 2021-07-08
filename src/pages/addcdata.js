import React, { useState, useEffect } from "react";
import Dialogcomponent from "./dialog";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Buttoncomponent from "./buttoncomponent";
import { element } from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  down: {
    margin: theme.spacing(5)
  },
  left: {
    marginLeft: theme.spacing(3)
  },
  cen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Addcdata() {
  const classes = useStyles();

  const history = useHistory();

  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/companies", {
        headers: {
          "content-type": "application/json"
        },
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      });
  }, []);

  function updatecompany(ind) {
    console.log(data[ind]);
    // call the component with data
    history.push({
      pathname: "/updatingcdata",
      state: data[ind]
    });
  }

  function addcompany() {
    history.push("/addingcdata");
  }

  return (
    <>
    <br/>
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="flex-start" >
        {data.map((element, index) => (
          <Grid item className={classes.left}>
            <Buttoncomponent
              style={{ marginLeft: "1rem" }}
              key={element._id}
              name={element.company_name}
              id={index}
              fun={updatecompany}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container className={classes.down}></Grid>
        <Grid container xs={12} className={classes.cen}>
          <Button style={{backgroundColor:"#fcca03",color:"blue"}} variant="outlined" color="secondary" onClick={addcompany}>
            Add new company
          </Button>
        </Grid>
    </>
  );
}
