import React from 'react'
import Hero from '../components/Herosection/Hero';
import {useEffect} from 'react';
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import { login_redux } from "../components/redux_code/userSlice";

const About = () => {
    
  const history = useHistory();

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
        <Hero/>
    )
}
export default About;
