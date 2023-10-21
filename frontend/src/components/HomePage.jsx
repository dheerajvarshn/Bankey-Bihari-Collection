import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import Footer from './Footer'
import Navbar from './Navbar'
import Product from './Product'
import Slides from './Slides'
import SearchResult from './SearchBox/searchresult'
import { useDispatch } from 'react-redux'
import { AuthDetail } from '../Action/Auth'

const HomePage = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(AuthDetail())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    
    <Box>
      <Navbar/>
      <SearchResult /> 
      <Slides />
      <Heading my={3} p={5}  color="#3a2626" bg={'green.100'} fontFamily='serif'>
        Bankey Bihari Fashion
      </Heading>

    {/* user has login and product in cart */}
     

      {/* <Category /> */}
      <Box 
      // bg='gray.50'
      >

      <Product category={"men"}/>
      <Product category={"women"}/>
      <Product category={"girls"}/>
      <Product category={"boys"}/>
      <Product category={"kids"}/>
      </Box>
      <Footer/>
    </Box>
  )
}

export default HomePage
