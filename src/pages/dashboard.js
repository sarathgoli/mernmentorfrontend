import React,{useEffect,useState} from 'react';
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import axios from 'axios';
import OutlinedCard from './card';
import {Grid} from "@material-ui/core";

export default function Dashboard(props) {
    const [userposts,setUserPosts]=useState([]);
    const user = useSelector(selectUser);
    const variable={userid:user.user_id};
    console.log(variable);
    useEffect(() => {
        axios
        .post(
          "https://mentor-gvpce.herokuapp.com/fetchuserposts",
          variable,{
          headers: {
            "content-type": "application/json"
          },
        withCredentials: true,
         })
        .then((res) => {
          if(res.data)
          {
            setUserPosts(res.data.result);
            console.log(res.data.result);
        }
        });
    }, [])
    console.log(userposts);
    return (
<>
  <div style={{width:'75%',margin:'3rem auto'}}>
    <div style={{textAlign:'center',color:"blueviolet"}}>
      <h2>Posts Made by you</h2>
    </div>
  <br/>
  {userposts.length===0?
  <div style={{display:'flex',height:'300px',justifyContent:'center',alignItems:'center'}}>
    <h2>No posts made by you.....</h2>
  </div>:
  <div>
      <Grid container spacing={2}>
      {userposts.map((obj)=>
        <Grid item xs={12} sm={6} md={4}>
        <OutlinedCard key={obj._id} page="dashboard" time={obj.time} _id={obj._id} title={obj.title} username={obj.u_name} desc={obj.desc} role={obj.c_role} companyname={obj.c_name}/>
      </Grid>
      )}
      </Grid>
  </div>}
  </div>
  </>
    )
    }


