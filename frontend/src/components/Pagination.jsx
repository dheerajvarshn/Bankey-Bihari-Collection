import { Box, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';

// import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


export function PaginatedItems({ itemsPerPage,products,items }) {
    // console.log(products)

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount,setPageCount]=useState(0)



    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    if(products){
      
      const currentItems = products.slice(itemOffset, endOffset);
      setPageCount(Math.ceil(products.length / itemsPerPage))
      items(currentItems)
    }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    <Box>

      <HStack justifyContent={'center'} gap={2} >

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        />
        </HStack>
        </Box>
    </>
  );
}
