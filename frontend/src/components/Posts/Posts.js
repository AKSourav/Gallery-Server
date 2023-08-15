import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import { getAdminPostsAction, getAllPostsAction } from '../../actions';

const Posts = ({admin }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch=useDispatch();
  const classes = useStyles();

  return (
    !posts.length ? "NO DATA" : (
      <Grid className={classes.mainContainer} container  spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6} style={{maxWidth:'35vh',heigth:'40vh'}}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
