import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {createPostAction} from '../../actions'
import useStyle from './styles'

const Form = () => {
    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    const [pic, setPic] = useState();
    const [loading,setLoading] = useState(false);
    const Navigate =useNavigate();
    const dispatch=useDispatch();
    const posts= useSelector((state)=>state.posts);
    const classes= useStyle();

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
        if(!title || !description || !pic)
        {
            console.log('enter all fields')
            setLoading(false);
            return;
        }

        try {
            const formdata={title,description,pic};
            console.log(formdata);
            dispatch(createPostAction(formdata));
            console.log("Posts:",posts)
            setLoading(false);
        }
        catch(error){
            console.log("Post Creation",error);
            setLoading(false);
        }

    }
  return (
    <>
        <Paper className={classes.paper} style={{width:'100%'}}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={submitHandler}>
                <Typography variant="h6">Create Post</Typography>
                <TextField name="title" variant="outlined" label="Name" fullWidth value={title}  onChange={(e)=>{setTitle(e.target.value)}} />
                <br/>
                <TextField name="description" variant="outlined" label="Description" fullWidth value={description}  onChange={(e)=>{setDescription(e.target.value)}} />
                <br/>
                <input
                    className={classes.fileInput}
                    type={"file"}
                    p={1.5}
                    onChange={(e)=>postDetails(e.target.files[0])}
                />
                <br/>
                <Button className={classes.buttonSubmit}  variant="contained" color="primary" size="large" type="submit" disabled={loading} fullWidth>{loading?<CircularProgress/>:'SUBMIT'}</Button>
                <br/>
            </form>
        </Paper>
    </>
  )
}

export default Form