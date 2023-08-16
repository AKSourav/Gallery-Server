import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { Avatar, Dialog } from '@mui/material';
import { deletePostAction } from '../../../actions';
import axios from 'axios';
import { getPost } from '../../../api';
import GetPost from './GetPost';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const profile=useSelector((state)=>state.auth.user);
  const classes = useStyles();
  const [open,setOpen]=useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleView=async ()=>{
    setOpen(true);
  }
  return (
    <>
    <Dialog onClose={handleClose} open={open}>
      <GetPost post={post}/>
    </Dialog>
    <Card className={classes.card}>

    <div style={{display:"flex",justifyContent:'center',alignItems:'center', padding:"0.5rem", fontWeight:"bold"}}>
      Created By: {post.createdBy.name}
    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Avatar sx={{ width: 56, height: 56 }} style={{cursor:'pointer'}} src={post.pic} title={post.title}  onClick={handleView}/>
    </div>
      <br/>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{height:'8vh',overflowY:'hidden',overflowWrap:'break-word'}}>{post.description}</Typography>
      </CardContent>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleView} ><VisibilityIcon fontSize="small" /> {post.views.length} {post.likeCount} </Button>
        {String(post.createdBy._id)===String(profile?._id) && <Button size="small" color="primary" onClick={() => {dispatch(deletePostAction(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button>}      </CardActions>
    </Card>
    </>
  );
};

export default Post;
