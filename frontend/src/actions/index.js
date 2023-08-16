import API, { createPost, deletePost, getAdminPosts, getAllPosts, getPost, searchUsers, signIn, signUp, updatePost } from '../api';
import {SIGNIN,SIGNUP,CREATE,UPDATE,DELETE, USERS, FETCH, FETCH_ADMIN, GET_POST} from './type';

// SignIn
export const signInAction = (formData) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await signIn(formData);

    dispatch({ type: SIGNIN, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error.response.data.message);
    alert(error.response.data.message)
  }
};

export const signUpAction = (formData) => async (dispatch) => {
  try{
    const { data } = await signUp(formData);

    dispatch({ type: SIGNUP, payload: data });

  }catch(error){
    alert(error.response.data.message)
  }
};

export const searchUsersAction = (formData) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await searchUsers(formData);

    dispatch({ type: USERS, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

export const createPostAction = (formData) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await createPost(formData);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error.response.data.message);
  }
};

export const updatePostAction = (formData) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await updatePost(formData);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await deletePost(postId);

    dispatch({ type: DELETE, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

export const getAllPostsAction = (filter) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await getAllPosts(filter);

    dispatch({ type: FETCH, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

export const getAdminPostsAction = (filter) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await getAdminPosts(filter);

    dispatch({ type: FETCH_ADMIN, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};

export const getPostAction = (postId) => async (dispatch) => {
  try {
    // block of code to try 
    const { data } = await getPost(postId);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    // block of code to handle errors
    console.log(error);
  }
};



