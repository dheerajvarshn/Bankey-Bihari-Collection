import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthDetail } from '../Action/Auth'
import axios from 'axios'

function Order() {
  const auth = useSelector((state)=>state.authReducer.Auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(AuthDetail())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  // fetch order
  useEffect(()=>{
axios.get(`https://localhost:5000/orders/user/${auth._id}`).then((res)=>{
    console.log(res.data)
}).catch(err=>console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
<Box>  
    Order Page
</Box>
  )
}

export default Order
