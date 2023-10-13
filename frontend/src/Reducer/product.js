const initstate={
    product:[]
}
const productReducer=(state=initstate,action)=>{
// eslint-disable-next-line default-case
switch(action.type){
    case "PRODUCT_LIST":{
        return {
            ...state,
            product:action.payload,
            pages:action.pages,
            page:action.page
        }
    }
    default:return state
}
    
}
export default productReducer