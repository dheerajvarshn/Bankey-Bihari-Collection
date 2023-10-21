import { Box, Button, HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useState } from 'react';

function Pagination({products,productPerPage}) {
  const [page, setPage] = useState(1);

  const selectedPageHandler = (selectedPage) => {
    if(selectedPage >= 1  && Math.ceil(products.length/10) && selectedPage !== page)
    setPage(selectedPage);
};
useEffect(()=>{
  console.log(page)
  productPerPage(page )
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])
  return (
    <Box>
          {products.length > 0 && (
            <HStack
              justify={"center"}
              mb={"5"}
              className="pagination"
              p={2}
              gap={3}
            >
              <Button onClick={()=>setPage(page-1)} _hover={{backgroundColor:'red.200'}} disabled={page<=1 && true} title="previous_page"> {"<"}Prev</Button>

              {[...Array(Math.ceil(products.length / 10))].map((_, i) => {
                return (
                  <Box
                    key={i}
                    cursor={"pointer"}
                    px={2}
                    backgroundColor={page===i+1 && "red.200"}
                    _hover={{ backgroundColor: "red.200" }}
                    border={"1px"}
                    onClick={() => selectedPageHandler(i + 1)}
                  >
                    {i + 1}
                  </Box>
                );
              })}

              <Button onClick={()=>setPage(page+1)} _hover={{backgroundColor:'red.200'}} title="next_page" disabled={page>=Math.ceil(products.length/10) && true }>Next {">"}</Button>
            </HStack>
          )}
        </Box>
  )
}

export default Pagination
