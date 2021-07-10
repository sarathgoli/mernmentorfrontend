import React,{useState} from 'react';
import Navbar from '../components/Navbar/index';
import Sidebar from '../components/sidebar';

export const Navside = () => {
    const [isOpen,setOpen]=useState(false);
    const toggle=()=>{
        setOpen(!isOpen);
    }
    return (
        <>
         <Sidebar isOpen={isOpen} toggle={toggle}/>
         <Navbar toggle={toggle}/>   
        </>
    )
}
