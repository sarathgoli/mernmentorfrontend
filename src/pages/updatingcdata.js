import React, { useState, useEffect } from "react";
import Dialogcomponent from "./dialog";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Buttoncomponent from "./buttoncomponent";
import { element } from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useLocation,useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  down: {
    margin: theme.spacing(5)
  },
  left: {
    marginLeft: theme.spacing(3)
  },
  down1: {
    marginBottom: theme.spacing(4)
  },
  cen: {
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Updatingcdata() {
  const classes = useStyles();
  const location = useLocation();
const history=useHistory();
  useEffect(() => {
    // console.log(location.state.company_roles.join())
  }, []);

  const [cdata, setcdata] = useState({
    c_name: location.state.company_name,
    c_roles: location.state.company_roles.join(),
    data_id: location.state._id
  });
  const [open, setOpen] = useState(false);
  const [dataentered, setdataentered] = useState(false);
  // const [name_user, setname_user] = useState("");

  const handleClosefrdetails = () => {
    setOpen(false);
  };

  const handlefruser_login = () => {
    setdataentered(false);
    history.goBack();
    // redirect to a different pageS
  };

  function handleChange(event) {
    setcdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleClick(event) {
    event.preventDefault();
    if (cdata.c_name === "" || cdata.c_roles === "") {
      setOpen(true);
    } else {
      console.log(cdata);
      axios
        .post("https://mentor-gvpce.herokuapp.com/updatingcdata", cdata, {
          headers: {
            "content-type": "application/json"
          },
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.isdone) {
            setdataentered(true);
          }
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.down} component="h1" variant="h5">
          Enter The Company Details
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Company Name"
            name="c_name"
            autoFocus
            onChange={handleChange}
            value={cdata.c_name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="c_roles"
            label="enter comma seperated roles"
            id="password"
            onChange={handleChange}
            value={cdata.c_roles}
            className={classes.down1}
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
            Add
          </Button>
        </form>
      </div>
      <Dialogcomponent
        variable={open}
        fun={handleClosefrdetails}
        heading="Empty Field"
        text="Please fill all the fields"
      />
      <Dialogcomponent
        variable={dataentered}
        fun={handlefruser_login}
        heading="updating Successful"
        text="Now users can also able to view the updated data"
      />
    </Container>
  );
}
