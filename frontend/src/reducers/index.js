// import libraries from redux
import { combineReducers } from 'redux';
// import posts and auth file
import auth from './auth';
import posts from './posts';
import users from './users';

export const reducers = combineReducers({ auth,posts,users });