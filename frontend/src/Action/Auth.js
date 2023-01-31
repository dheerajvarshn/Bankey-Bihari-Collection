export const AuthDetail=(data)=>{
    return {
        type:"ADD_AUTH",
        payload:data
    }
}

export const DeleteAuth=()=>{
   return {
    type:"DELETE_AUTH"
   }
}