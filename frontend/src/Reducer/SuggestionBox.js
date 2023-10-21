const initstate = {
    ShowBox : false
  }

  const suggestionBoxReducer=(state=initstate,action)=>{
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