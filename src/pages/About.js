import React,{useEffect} from 'react'
import Hero from '../components/Herosection/Hero';
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import { login_redux } from "../components/redux_code/userSlice";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {bounce} from "./scrolling.css";
const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const About = () => {
    const history = useHistory();
    const classes = useStyles();
    // const user = useSelector(selectUser);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      axios
        .get("https://mentor-gvpce.herokuapp.com/", {
          headers: {
            "content-type": "application/json"
          },
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.isloggedin) {
            dispatch(
              login_redux({
                user_name: res.data.name,
                user_id: res.data.user_id,
                isauthenticated: true,
                isadmin: res.data.isadmin
              })
            );
  
            history.push("/home");
          }
        });
    }, []);
    return (
        <>
          <div className="displayingpost" style={{width:'80%',margin:'3rem auto',font:"bold"}}>
          <Card className={classes.root} variant="outlined">
          <CardContent>
          This website enables users to write blogs about their interview experiences.Besides writing blogs,users can read and search for the content they want by using filters provided in the page.
            <br/>
            <span style={{color:"#f03211"}}>To have a experience of this website.Please login first</span>
          </CardContent>
          </Card>
          </div>
        </>
    )
}
export default About;
