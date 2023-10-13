import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import pageNotFound from "../images/error.png"

const Error = () => {
  return (
    <Flex justifyContent={'center'}>
        <Image boxSize='50%' src={pageNotFound} alt='Page Not Found' />
    </Flex>
  )
}

export default Error
