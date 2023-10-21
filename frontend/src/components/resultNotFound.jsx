import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import resultNotFound from "../images/resultNotFound.png"


const ResultNotFound=()=> {
  return (
    <Box>
        <Image width={'30em'}  src={resultNotFound} marginRight={'15em'} alt='Page Not Found'/>
    </Box>
  )
}

export default ResultNotFound
