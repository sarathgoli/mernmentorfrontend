import React,{useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import { logout_redux } from "../components/redux_code/userSlice";
export default function Logout() {
    const history=useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
    axios.post("https://mentor-gvpce.herokuapp.com/logout",{},{headers:{"content-type":"application/json"},withCredentials:true})
                .then((response)=>{
                  if(!response)
                  {
                      console.log("error");
                  }
                  else{
                    dispatch(
                        logout_redux()
                      );
                  }
                }
                )
    history.push("/");
    })
    return (
        <div>
        </div>
    )
}
