import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getPostAction } from '../../../actions';

const GetPost = ({post}) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        try{
            dispatch(getPostAction(post._id));
          }catch(err)
          {
            console.log(err);
          }
    },[post]);
  return (
    <>
        {post && <img src={post.pic} alt='err'/>}
    </>
  )
}

export default GetPost