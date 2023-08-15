import { INIT, SIGNIN, SIGNUP } from "../actions/type";

const authReducer = (auth = { user: null}, action) => {
  switch (action.type) {
    case INIT:
      console.log('init')
      console.log(localStorage.getItem('profile'))
      if(localStorage.getItem('profile'))
        return{...auth,user:JSON.parse(localStorage.getItem('profile'))};
      return auth
    case SIGNIN:
      console.log("Sigin reducer",action.payload)
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return { ...auth, user: action.payload};
    case SIGNUP:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

      return { ...auth, user: action?.payload};
    case 'LOGOUT':    
      localStorage.clear();

      return { ...auth, user: null};
    default:
      return auth;
  }
};

export default authReducer;
