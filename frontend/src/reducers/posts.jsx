import { CREATE, DELETE, FETCH, UPDATE,FETCH_ADMIN } from "../actions/type";
const postsReducer = (posts = [], action) => {
    switch (action.type) {
      case FETCH:
        return [...action?.payload] ;
      case FETCH_ADMIN:
        return [...action?.payload] ;
      case CREATE:
        return [...posts,action.payload] ;
      case UPDATE:{
        let index=posts.findIndex(e=>String(e?._id)===String(action.payload?._id));
        if(index!==-1)
          posts[index]=action.payload;
        return [...posts] ;
      }
      case DELETE:{
        let updatePosts=posts.filter((e)=>String(e?._id)!==String(action.payload?._id))
        return updatePosts ;
      }
      default:
        return posts;
    }
  };
  
  export default postsReducer;
  