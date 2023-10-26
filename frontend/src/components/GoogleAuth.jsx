import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const GoogleAuth = () => {

    useEffect(()=>{
        axios.get('https://mern-zvtq.onrender.com/auth/google').then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
  return (
    <div>
      
    </div>
  )
}

export default GoogleAuth
