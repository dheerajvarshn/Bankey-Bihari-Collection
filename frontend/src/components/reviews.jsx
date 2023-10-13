import React from 'react'
import { Box, Container, Heading ,Image,Text } from '@chakra-ui/react' 

function Reviews() {
  return (
   <Container border={'1px'} 
   marginTop={'5'}
   marginX={'1'}
   height={'100rem'}
   borderColor={'#EDF2F7'}
   boxShadow='xs' p='5' rounded='md' bg='white'>
    <Box>
    <Heading as='h1' size='xl'  noOfLines={1}>
    Ratings & Review
  </Heading>
    </Box>
    <Box border={'1px'}>
      <Box>
      <Image
    boxSize='100px'
    objectFit='cover'
    src=''
    alt='star'
  />
        5
      </Box>
      <Text>
        We recomended to buy this product 
      </Text>
    </Box>
   </Container>
  )
}

export default Reviews
