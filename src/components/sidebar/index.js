import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { selectUser } from "../redux_code/userSlice";
import { useSelector } from "react-redux";
import {SidebarContainer,Icon,CloseIcon,SideBtnWrap,SidebarWrapper,SidebarMenu,SidebarLink,SidebarRoute} from './sidebarelements'
const Sidebar=({isOpen,toggle})=> {
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
        {user?user.isadmin?<SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
              <CloseIcon/> 
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/home" onClick={toggle}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/admindashboard" onClick={toggle}>
                        Dashboard
                    </SidebarLink>
                    <SideBtnWrap>
                        <SidebarRoute onClick={handleClick}>{user?"Logout":"Login"}</SidebarRoute>
                    </SideBtnWrap>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>:<SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
              <CloseIcon/> 
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/home" onClick={toggle}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/writeblog" onClick={toggle}>
                        Writeblog
                    </SidebarLink>
                    <SidebarLink to="/dashboard" onClick={toggle}>
                        Dashboard
                    </SidebarLink>
                    <SideBtnWrap>
                        <SidebarRoute onClick={handleClick}>{user?"Logout":"Login"}</SidebarRoute>
                    </SideBtnWrap>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>:<SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
              <CloseIcon/> 
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/home" onClick={toggle}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/writeblog" onClick={toggle}>
                        Writeblog
                    </SidebarLink>
                    <SidebarLink to="/dashboard" onClick={toggle}>
                        Dashboard
                    </SidebarLink>
                    <SideBtnWrap>
                        <SidebarRoute onClick={handleClick}>{user?"Logout":"Login"}</SidebarRoute>
                    </SideBtnWrap>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>}
        </>
    )
}

export default Sidebar
