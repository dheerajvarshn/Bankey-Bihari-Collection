import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch} from 'react-redux';
import { Add } from '../Action';

const CartProduct = () => {
    const token =JSON.parse(localStorage.getItem('Token'))
    const dispatch=useDispatch()
    
      // get cart products from database
  useEffect(()=>{
    if(token){
    axios
    .get("https://mern-zvtq.onrender.com/user/cart/addtocart",{
        headers: {
          "Authorization": token
        }
      })
      .then((result) => {
        if(result.data){
          console.log(result.data)
          console.log('hello')
          result.data.map((item)=>(
            dispatch(Add(item))
          ))
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })
}

export default CartProduct
