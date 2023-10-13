import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const GoogleAuth = () => {

    useEffect(()=>{
        axios.get('http://localhost:5000/auth/google').then((res)=>{
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
