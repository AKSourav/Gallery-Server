import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {signInAction} from '../../actions'
import useStyles from '../Form/styles'

const Login = () => {
    const [show,setShow]=useState(false);
    const [email,setEmail] = useState()
    const [password,setPassword]= useState();
    const [loading,setLoading] = useState(false);
    const Navigate =useNavigate();
    const dispatch=useDispatch();
    const classes= useStyles();
    const profile= useSelector((state)=>state.auth.user)


    const submitHandler=(e)=>{
        e.preventDefault();
        if(!email || !password)
        {
            alert("enter all fields");
            return;
        }

        try{
            dispatch(signInAction({email,password}));
        }catch(error){
            console.log("Login Error:",error.response.data.message);
        }
    }

  return (
    <>
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={submitHandler}>
                <TextField  name="email" type="email" variant="outlined" label="Email" fullWidth value={email}  onChange={(e)=>{setEmail(e.target.value)}} />
                <br/>
                <TextField  name="password" type="password" variant="outlined" label="Password" fullWidth value={password}  onChange={(e)=>{setPassword(e.target.value)}} />
                <br/>
                <Button className={classes.buttonSubmit}  variant="contained" color="primary" size="large" type="submit" disabled={loading} fullWidth>Submit</Button>
                <br/>
            </form>
        </Paper>
    </>
  )
}

export default Login