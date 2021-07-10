import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import { Link as LinkM } from '@material-ui/core';

export const Nav=styled.nav`
    background:#000;
    height:80px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.5rem calc((100vw-1000px)/2);
    z-index:10;
`;
export const NavLink=styled(Link)`
    color: #fff;
    height: 100%;
    text-decoration:none;
    display:flex;
    align-items:center;
    padding:0 1rem;
    margin-left:50px;
    font-size:1.0rem;
    cursor:pointer;

    &.active
    {
        color: #fcca03;
    }
`;

export const NavLink1=styled(Link)`
    color: #fff;
    height: 100%;
    text-decoration:none;
    display:flex;
    font-size:1.0rem;
    align-items:center;
    padding:0 5rem;
    cursor:pointer;

    &.active
    {
        color:#fcca03;
    }
`;

export const Bars=styled(FaBars)`
    display:none;
    color:#fcca03;

    @media screen and (max-width:768px)
    {
        display:block;
        position:absolute;
        top:0;
        right:0;
        transform:translate(-100%,75%);
        font-size:1.8rem;
        cursor:pointer;
    }
`;
export const NavMenu=styled.div`
    display:flex;
    align-items:center;
    margin-left:40px;
    margin-right:50px;
    @media screen and (max-width:768px)
    {
        display:none;
    }
`;
export const NavBtn=styled.nav`
    display:flex;
    align-items:center;
    margin-right:150px;
    @media screen and (max-width:768px)
    {
        display:none;
    }
`;
export const NavBtnLink=styled(LinkM)`
    border-radius:50px;
    background:#fcca03;
    white-space:nowrap;
    padding:10px 22px;
    color:#fff;
    font-size:16px;
    border:none;
    outline:none;
    cursor:pointer;
    transition:all 0.2s ease-in-out;
    text-decoration:none;

    &:hover{
        transition:all 0.2s ease-in-out;
        background:#fff;
        color:#010606;
    }
`;