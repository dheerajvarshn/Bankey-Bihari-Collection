const initstate=0

const changeNumber=(state=initstate,action)=>
{
    switch(action.type){
        case 'INCREAMENT':return state+1 
        
        case 'DECREAMENT':{
            return state-1
        }
        default:return state
    }
}

export default changeNumber;