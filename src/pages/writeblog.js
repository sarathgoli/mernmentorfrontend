import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Alert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
//import Snackbar from '@material-ui/core/Snackbar';
import Button from "@material-ui/core/Button";
import QuillEditor from "./quilleditor";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./styles.css";
import { useState, useEffect } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function Writeblog(props) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  console.log(user);

  const onEditorChange = (value) => {
    setContent(value);
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };
  // const company_list = ["Amazon", "Google", "Tcs", "Wipro", "Infosys"];
  // const companyrole_list = ["Amazon", "Google", "Tcs", "Wipro"];
  const branches_list = ["Cse", "Ece", "Civil", "Mechanical", "IT", "Chemical"];
  const [new_blog, set_new_blog] = useState({
    userid: user.user_id,
    c_name: "",
    c_role: "",
    branch: "",
    desc: "",
    u_name: user.user_name,
    title: ""
  });

  const [company_list, setcompany_list] = useState([]);
  const [companyrole_list, setcompanyrole_list] = useState([]);
  const [company_map, setcompany_map] = useState(new Map());
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
        console.log(res.data);
        res.data.forEach((element) => {
          console.log(element);
          setcompany_list((company_list) => [
            ...company_list,
            element.company_name
          ]);
          setcompany_map(
            (prev) =>
              new Map([...prev, [element.company_name, element.company_roles]])
          );
          // console.log(company_map)
        });
      });
  }, []);

  useEffect(() => {
    // console.log("for role");
    // console.log(company_map);
    setcompanyrole_list(company_map.get(new_blog.c_name));
    // console.log(companyrole_list)
  }, [new_blog.c_name]);

  // you need to pass the username through props to Writeblog,, then u_name in new_blog will be props.username

  function handleChange(event) {
    set_new_blog((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }));
  }

  function buttonEvent(event) {
    new_blog.desc = content;
    event.preventDefault();
    if (
      new_blog.c_name === "" ||
      new_blog.c_role === "" ||
      new_blog.branch === "" ||
      new_blog.title === ""
    ) {
      window.alert("Please Select all options");
    } else {
      if (window.confirm("Do you want to do final Submit")) {
        console.log(new_blog);

        axios
          .post("https://mentor-gvpce.herokuapp.com/testingreact", new_blog, {
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true
          })
          .then((res) => {
            if (res.data) {
              setTimeout(() => {
                props.history.push("/dashboard");
              }, 1000);
            }
          });
        set_new_blog({
          userid: user.user_id,
          c_name: "",
          c_role: "",
          branch: "",
          desc: "",
          u_name: user.user_name,
          title: ""
        });
        onEditorChange("");
        onFilesChange([]);
      }
    }
  }

  return (
    <div className={classes.root}>
      <form>
        <Container maxWidth="md">
        <h2 style={{display:"flex",justifyContent:"center",color:"#015794",marginRight:"70px"}}>Write your content</h2>
        <br/>
          <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
            <Grid item spacing={3} direction="column">
            <Grid item xs={12} style={{color:"#015794"}}>Select these options</Grid>
              <Grid item xs style={{ margin: "16px 0px" }}>
                <TextField
                  name="title"
                  value={new_blog.title}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} style={{ margin: "16px 0px" }}>
                <label style={{color:"#015794"}}> select company name </label>
                <select
                  name="c_name"
                  value={new_blog.c_name}
                  onChange={handleChange}
                  id="cars"
                  required
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  {company_list.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <label style={{color:"#015794"}}> select role </label>
                <select
                  name="c_role"
                  value={new_blog.c_role}
                  onChange={handleChange}
                  id="cars"
                  required
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  {companyrole_list &&
                    companyrole_list.map((element) => (
                      <option key={element} value={element}>
                        {element}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <label style={{color:"#015794"}}> select branch </label>
                <select
                  name="branch"
                  value={new_blog.branch}
                  onChange={handleChange}
                  id="cars"
                  required
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  {branches_list.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
            <Grid>
              <Typography color="primary">Write Your Experience</Typography>
              <QuillEditor
                placeholder={"Start posting something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
              />
            </Grid>
          </Grid>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                <Button
                style={{backgroundColor:"#fcca03",color:"blue"}}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={(event) => {
                    buttonEvent(event);
                  }}
                >
                  Post
                </Button>
            </div>

        </Container>
      </form>
    </div>
  );
}
