import React,{useState,useEffect} from 'react';
import Writeblog from './writeblog';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
//import Alert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
//import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import QuillEditor from "./quilleditor";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
// import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import "./styles.css";

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

 function Editpost(props) {
    const classes = useStyles();
    const [content,setContent]=useState("");
    const [files,setFiles]=useState([]);
    const[open,setOpen]=useState(false);
  
  
    const onEditorChange=(value)=>{
      setContent(value);
    }
    const onFilesChange=(files)=>{
      setFiles(files);
    }
    const company_list = ["Amazon", "Google", "Tcs", "Wipro", "Infosys"];
    const companyrole_list = ["Amazon", "Google", "Tcs", "Wipro"];
    const branches_list = ["Cse", "Ece", "Civil", "Mechanical", "IT", "Chemical"];
    const [new_blog, set_new_blog] = useState({
        postid : "",
        c_name: "",
        c_role: "",
        branch: "",
        desc: "",
        title: ""
        });
    useEffect(()=>{
        const postid=props.match.params.postid;
        const variable={postId:postid};
        axios.post("http://localhost:5005/editpost",variable,{
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true})
        .then(response=>{
            if(response.data.success){
                set_new_blog({
                    postid : response.data.post._id,
                    c_name: response.data.post.c_name,
                    c_role: response.data.post.c_role,
                    branch: response.data.post.branch,
                    desc: response.data.post.desc,
                    title: response.data.post.title
                    });
            }
            else{
                alert('Failed to bring post data')
            }
        })
        onEditorChange(new_blog.desc);
    },[])

    // you need to pass the username through props to Writeblog,, then u_name in new_blog will be props.username
  
    function handleChange(event) {
      set_new_blog((prevValue) => ({
        ...prevValue,
        [event.target.name]: event.target.value
      }));
    }
  
    function buttonEvent(event) {
      new_blog.desc=content;
      event.preventDefault();
      if (
        new_blog.c_name === "" ||
        new_blog.c_role === "" ||
        new_blog.branch === ""||
        new_blog.title===""
      ) {
        window.alert("Please Select all options");
      } else {
        if (window.confirm("Do you want to do final Submit")) {
          console.log(new_blog);
         
          axios
            .post(
              "http://localhost:5005/updatepost",
              new_blog,{
              headers: {
                "content-type": "application/json"
              },
            withCredentials: true,
             })
            .then((res) => {
              if(res.data)
              {
                
              setTimeout(()=>{
  
                props.history.push("/dashboard");
              },1000);
            }
            });
          //set_new_blog({postid: "",c_name: "",c_role: "",branch: "",desc: "",title: ""});
          //onEditorChange("");
          //onFilesChange([]);
        }
      }
    }console.log(new_blog.desc);
    return (
        <div className={classes.root}>
          <form>
            <Container maxWidth="md">
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item>
                  <Typography
                    style={{ padding: "0px", margin: "0px 0px" }}
                    variant="h1"
                    color="primary"
                  >
                    Write your blogs here
                  </Typography>
                </Grid>
                <Grid item spacing={3} direction="column" xs={4}>
                  <Typography color="primary">Select These Options</Typography>
                  <Grid item xs style={{ margin: "16px 0px" }}>
                <TextField name="title" value={new_blog.title} onChange={handleChange} id="outlined-basic" label="title" variant="outlined" />
                </Grid>
                  <Grid item xs style={{ margin: "16px 0px" }}>
                    <label> select company name </label>
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
                  <Grid item xs style={{ marginBottom: "16px" }}>
                    <label> select role </label>
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
                      {companyrole_list.map((element) => (
                        <option key={element} value={element}>
                          {element}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid items xs style={{ marginBottom: "16px" }}>
                    <label> select branch </label>
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
                <Grid item xs={8}>
                  <Typography color="primary">Write Your Experience</Typography>
                  <QuillEditor page="editpost" content={new_blog.desc} placeholder={"Start posting something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                  />
                </Grid>
                <Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={(event) => {
                        buttonEvent(event);
                      }}
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </form>
        </div>
      );
    }
  
  export default Editpost;