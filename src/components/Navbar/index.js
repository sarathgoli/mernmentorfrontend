import React,{useState} from 'react';
import { useHistory } from 'react-router';
import {Nav,NavLink,NavLink1,Bars,NavMenu,NavBtn,NavBtnLink} from './Menuitems';
import { FormLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { selectUser } from "../redux_code/userSlice";
import { useSelector } from "react-redux";
import { DiRedhat } from "react-icons/di";
export default function Navbar(){
    const user = useSelector(selectUser);
    const [click,setClick]=useState(false);
    const history=useHistory();
    console.log(user)
    const handleClick=()=>{
        if(user)
        {
            setClick(!click);
            history.push("/logout");
        }
        else
        {
            setClick(!click);
            history.push("/login");
        }
    }
    return (
        <>
        {user?user.isadmin?<Nav>
            <NavLink1 to="/">
                <DiRedhat size={70}/>
                Mentor
            </NavLink1>
            <Bars/>
            <NavMenu>
            <NavLink to="/home" activeStyle>
                Home
            </NavLink>
            <NavLink to="/admindashboard" activeStyle>
                Dashboard
            </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink onClick={handleClick}>{user?"Logout":"Login"}</NavBtnLink>
            </NavBtn>
        </Nav>:
        <Nav>
            <NavLink1 to="/">
            <DiRedhat size={70}/>
            Mentor
            </NavLink1>
            <Bars/>
            <NavMenu>
            <NavLink to="/home" activeStyle>
                Home
            </NavLink>
            <NavLink to="/writeblog" activeStyle>
                Writeblog
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                Dashboard
            </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink onClick={handleClick}>{user?"Logout":"Login"}</NavBtnLink>
            </NavBtn>
        </Nav>:<Nav>
            <NavLink1 to="/">
            <DiRedhat size={70}/>
            Mentor
            </NavLink1>
            <Bars/>
            <NavMenu>
            <NavLink to="/home" activeStyle>
                Home
            </NavLink>
            <NavLink to="/writeblog" activeStyle>
                Writeblog
            </NavLink>
            <NavLink to="/dashboard" activeStyle>
                Dashboard
            </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink onClick={handleClick}>{user?"Logout":"Login"}</NavBtnLink>
            </NavBtn>
        </Nav>
        }
        </>
    
    )

}

