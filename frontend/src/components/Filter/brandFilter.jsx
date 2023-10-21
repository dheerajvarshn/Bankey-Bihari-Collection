import { Box, Checkbox, Heading, Stack } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BrandFilter=memo(({ brand }) =>{
  const [showAllItems, setShowAllItems] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [uniqueBrand, setUniquiBrand] = useState([]);
  const { searchResult } = useSelector((state) => state.searchReducer);
  console.log('brand filter')

  // fetch search data
  useEffect(() => {
    try {
      if (searchResult[0].length === 0) {
        return;
      } else {
        searchResult[0].forEach((item) => {
          !uniqueBrand.includes(item.brand) &&
            setUniquiBrand([...uniqueBrand, item.brand]);
        });
      }
    } catch (error) {
      console.log({ error: error });
    }
  }, [searchResult, uniqueBrand]);

  useEffect(() => {
    if (filterProduct.length !== 0) 
     brand(filterProduct);
  }, [brand, filterProduct]);

  
  const handleChange = (e) => {
    console.log(e.target.value)
    try {
          if (e.target.checked && !filterProduct.includes(e.target.value)) {
      setFilterProduct([...filterProduct, e.target.value]);
    }
    if (e.target.checked && filterProduct.includes(e.target.value)) {
      return;
    }

    if (!e.target.checked && filterProduct.includes(e.target.value)) {
      const removeProduct = filterProduct.filter(
        (item) => item !== e.target.value
      );
      setFilterProduct(removeProduct);
    }
    } catch (error) {
      console.log({ error: error });
    }

  };
  console.log(filterProduct)
  //  funtionality for showmore items
  const visibleItem = showAllItems ? uniqueBrand : uniqueBrand.slice(0, 5);

  const showBrand = () => {
    setShowAllItems(!showAllItems);
    window.scrollTo(0, 0);
  };
  return (
    <Box mt={2}>
      {uniqueBrand && (
        <>
          <Heading size={"sm"} fontStyle={"oblique"}>
            Brand
          </Heading>

          <Box>
            <Stack spacing={2} direction="column">
              {visibleItem.map(
                (brand, index) =>
                  brand && (
                    <Checkbox
                      size="sm"
                      key={index}
                      value={brand}
                      colorScheme="red"
                      onChange={handleChange}
                    >
                      {brand && brand.toUpperCase()}
                    </Checkbox>
                  )
              )}
            </Stack>
          </Box>
          <Box
            color={"red.400"}
            fontSize="13px"
            mt={2}
            cursor={"pointer"}
            textAlign={"center"}
          >
            <button onClick={showBrand}>
              {showAllItems ? "Show Less" : "Show More"}
            </button>
          </Box>
        </>
      )}
    </Box>
  );
})

export default BrandFilter;
