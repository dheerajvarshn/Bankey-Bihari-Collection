/* eslint-disable no-fallthrough */
const initstate = {
    Auth:{}
  }
  
const authReducer=(state=initstate,action)=>{
    switch(action.type){
        case "ADD_AUTH":{
            return {...state,Auth: action.payload}
        }
        case "DELETE_AUTH":{
            return {...state,Auth:{}}

        }
        default:
            return state
        
    }

}

export default authReducer