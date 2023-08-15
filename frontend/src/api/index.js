import axios from "axios";
//for local -> http://localhost:5000

// creating axio calls to backend API 
// Set config defaults when creating the instance
const API = axios.default.create({
    // baseURL: 'http://localhost:5000'
  });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// fetching data from backend 
//user routes
const signIn=(data)=>API.post('/api/users/login',data);
const signUp=(data)=>API.post('/api/users/',data);
const searchUsers=(data)=>API.get('/api/users',{params:{search:data}});

//post routes
const createPost=(data)=>API.post('/api/posts/',data);
const getAllPosts=(data)=>API.get('/api/posts/',data);
const getAdminPosts=(data)=>API.get('/api/posts/admin',data);
const getPost=(postId)=>API.get(`/api/posts/${postId}`);
const updatePost=(data)=>API.patch(`/api/posts`,data);
const deletePost=(postId)=>API.delete(`/api/posts/${postId}`);

export {signIn,signUp,searchUsers,createPost,getAllPosts,getAdminPosts,getPost,updatePost,deletePost};
export default API;