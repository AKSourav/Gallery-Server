import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import { Avatar, Button, Typography } from '@mui/material';
import logo from '../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const dispatch= useDispatch();
  const Navigate=useNavigate();
  const profile = useSelector((state)=>state.auth.user);
  useEffect(()=>{
    dispatch({type:'INIT'});
    if(!profile || !localStorage.getItem('profile'))
    {
      Navigate('/auth')
    }
  },[Navigate])

  const handleLogOut=()=>{
    dispatch({type:'LOGOUT'})
    Navigate('/auth')    
  }

  return (
    <>
    <AppBar style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} position="static" color="inherit">
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",marginLeft:"1vh"}}>
      <Typography variant="h3" align="center">Gallery</Typography>
      <img src={logo} alt="icon" height="60" />
    </div>
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:'1vh'}}>
    {profile?(
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
      <Avatar alt={profile.name} src={profile.pic} />
      <Button variant='contained' color='inherit' onClick={handleLogOut}>LOGOUT({profile.name})</Button>
      </div>
    ):(
      <>
      </>
    )}
    </div>
    </AppBar>
    </>
  )
}

export default Navbar;
