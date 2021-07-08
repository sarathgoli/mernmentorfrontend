import React from "react";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Redirect, useHistory } from "react-router-dom";
import Grid from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function AdminDashboard() {
  const classes = useStyles();
  const history = useHistory();

  function handleClickfraddingmail(event) {
    event.preventDefault();
    history.push("/addmail");
  }

  function handleClickfraddingcompanydata(event) {
    event.preventDefault();
    history.push("/addcdata");
  }
  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form}>
        <Button
        style={{backgroundColor:"#fcca03",color:"blue"}}
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={(event) => {
            handleClickfraddingmail(event);
          }}
        >
          Add a new admin
        </Button>
        <Button
        style={{backgroundColor:"#fcca03",color:"blue"}}
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={(event) => {
            handleClickfraddingcompanydata(event);
          }}
        >
          Companies Data
        </Button>
      </form>
    </Container>
  );
}
