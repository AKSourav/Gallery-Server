import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {signUpAction} from '../../actions'
import useStyles from '../Form/styles';

const SignUp = () => {
    const [show,setShow]=useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [password,setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading,setLoading] = useState(false);
    const Navigate =useNavigate();
    const dispatch=useDispatch();
    const profile= useSelector((state)=>state.auth.user);
    const classes=useStyles();

    const handleClick=(e)=>{
        e.preventDefault();
        setShow(!show);
    }

    const postDetails=(pics)=>{
        console.log("postDetails");
        setLoading(true);

        if(pics===undefined)
        {
            console.log('undefind Image')
            setLoading(false);
            return;
        }
        console.log(pics.type);

        if(pics.type==="image/img" || pics.type==="image/jpeg" || pics.type==="image/png")
        {
            const data= new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","aksuploads");
            fetch("https://api.cloudinary.com/v1_1/aksuploads/image/upload",{
                method:'post',
                body: data
            }).then((res)=>res.json())
              .then((data)=>{
                console.log(data);
                setPic(data.url.toString());
                setLoading(false);
              })
              .catch((err)=>{
                console.log(err);
                setLoading(false);
              })
        }
        else
        {
            console.log("Please upload image!")
            setLoading(false);
            return;
        }

    }

    const submitHandler= async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(!name || !email || !password || !confirmpassword)
        {
            console.log('enter all fields')
            setLoading(false);
            return;
        }

        if(password !== confirmpassword)
        {
            console.log('password!=confirm password')
            setLoading(false);
            return;
        }

        
        try {
            const formdata={name,email,password};
            console.log(formdata);
            if(pic) formdata.pic=pic;
            await dispatch(signUpAction(formdata));
            console.log("Profile:",profile)
            setLoading(false);
        }
        catch(error){
            console.log("Auth",error);
            setLoading(false);
        }

    }
  return (
    <>
        <Paper>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={submitHandler}>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={name}  onChange={(e)=>{setName(e.target.value)}} />
                <br/>
                <TextField name="email" type="email" variant="outlined" label="Email" fullWidth value={email}  onChange={(e)=>{setEmail(e.target.value)}} />
                <br/>
                <TextField name="password" type="password" variant="outlined" label="Password" fullWidth value={password}  onChange={(e)=>{setPassword(e.target.value)}} />
                <br/>
                <TextField name="confirmPassword" type="password" variant="outlined" label="Confirm Password" fullWidth value={confirmpassword} onChange={(e)=>{setConfirmpassword(e.target.value)}} />
                <br/>
                <input
                    type={"file"}
                    p={1.5}
                    onChange={(e)=>postDetails(e.target.files[0])}
                />
                <br/>
                <Button  variant="contained" color="primary" size="large" type="submit" disabled={loading} fullWidth>{loading?<CircularProgress/>:'Submit'}</Button>
                <br/>
            </form>
        </Paper>
    </>
  )
}

export default SignUp