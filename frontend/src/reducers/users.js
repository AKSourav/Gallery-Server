import { USERS } from "../actions/type";

const usersReduces=(getUsers=[],action)=>{
    switch(action.type){
        case USERS:
            return [...action?.payload];
        default:
            return getUsers;
    }
}

export default usersReduces;