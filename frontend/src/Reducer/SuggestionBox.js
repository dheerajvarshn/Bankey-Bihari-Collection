const initstate = {
    ShowBox : false
  }

  const suggestionBoxReducer=(state=initstate,action)=>{
    console.log(action.payload)
    // eslint-disable-next-line default-case
    switch(action.type){
        case "SUGGESTION_BOX":{
            return {
                ...state,
               ShowBox  : action.payload
            }
        }
        default:return state
    }
}

export default suggestionBoxReducer