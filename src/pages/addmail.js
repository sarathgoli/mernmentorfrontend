import React, { useState } from "react";
import validator from "validator";
import Dialogcomponent from "./dialog";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  down: {
    marginTop: theme.spacing(18)
  }
}));

export default function Addmail() {
  const classes = useStyles();
  const history=useHistory();
  const [mail, setmail] = useState("");
  const [email_verifier, setemail_verifier] = useState(false);
  const [adding_success, setadding_success] = useState(false);
  const [adding_failed, setadding_failed] = useState(false);

  function handleChange(event) {
    setmail(event.target.value);
  }

  const handleClose = () => {
    setemail_verifier(false);
  };

  const handlefradding_success = () => {
    setadding_success(false);
    history.goBack();
  };

  const handlefradding_failed = () => {
    setadding_failed(false);
  };

  function handleClick(event) {
    event.preventDefault();
    if (validator.isEmail(mail)) {
      axios
        .post(
          "https://mentor-gvpce.herokuapp.com/addadminmail",
          { mail: mail },
          {
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.isdone) {
            setadding_success(true);
            setmail("");
          } else {
            setadding_failed(true);
          }
        });
    } else {
      setemail_verifier(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Enter Email Address"
          name="mail"
          autoComplete="email"
          className={classes.down}
          onChange={handleChange}
          value={mail}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => {
            handleClick(event);
          }}
        >
          Add Admin
        </Button>
      </form>
      <Dialogcomponent
        variable={adding_success}
        fun={handlefradding_success}
        heading="Admin added"
        text="Ask the email user to register for accessing the admin rights, if already registerred ask him to login for admin rights"
      />
      <Dialogcomponent
        variable={email_verifier}
        fun={handleClose}
        heading="Invalid email"
        text="Please provide a valid email address"
      />
      <Dialogcomponent
        variable={adding_failed}
        fun={handlefradding_failed}
        heading="admin already exists"
        text="The provided mail is already an admin!!! "
      />
    </Container>
  );
}
