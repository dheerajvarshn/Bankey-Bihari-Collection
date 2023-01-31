export const productList=(data,pages,page)=>{
    return {
        type:"PRODUCT_LIST",
        payload:data,
        pages:pages,
        page:page
    }
}