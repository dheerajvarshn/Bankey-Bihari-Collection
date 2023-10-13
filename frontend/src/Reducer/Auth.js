/* eslint-disable no-fallthrough */
const initstate = {
    Auth:[]
  }
  
const authReducer=(state=initstate,action)=>{
    switch(action.type){
        case "ADD_AUTH":{
            return {user:action.payload}
        }
        case "DELETE_AUTH":{
            return {user:null}

        }
        default:
            return state
        
    }

}

export default authReducer