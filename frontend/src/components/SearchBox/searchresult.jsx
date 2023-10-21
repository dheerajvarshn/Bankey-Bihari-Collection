import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuggestion } from "../../Action/suggestionBox";

function SearchResult() {
  const dispatch = useDispatch()
  const suggestionBox = useSelector((state) => state.suggestionBoxReducer);
  const navigate = useNavigate();
  const { searchResult } = useSelector((state) => state.searchReducer);
  console.log (searchResult)

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (searchResult.length === "") {
      return setResult([]);
    } else if (searchResult[0]) {
      setResult(searchResult[0].slice(0, 10));
    }
  }, [searchResult]);

  const handleClick = (id) => {
    dispatch(showSuggestion(false))
    navigate(`/product/category/subcategory/${id}`);
  };
  return (
    suggestionBox.ShowBox && (
      <Box
        position={"absolute"}
        zIndex={"1"}
        left="0"
        mt="2"
        bg="white"
        border="1px"
        borderColor="blackAlpha"
        ml={5}
        borderRadius="md"
        boxShadow="sm"
      >
        {result ? (
          <ul>
            {result.map((product) => (
              <Box
                display={"flex"}
                p={2}
                borderBottom={"1px"}
                borderColor={"blackAlpha.500"}
                cursor={"pointer"}
                _hover={{
                  bg: "teal.600",
                }}
                onClick={() => handleClick(product._id)}
              >
                <Box>
                  <Image
                    src={product.image}
                    boxSize="100px"
                    objectFit="cover"
                    alt="Dan Abramov"
                    width={"50px"}
                    height={"50px"}
                    border={"1px solid black"}
                  />
                </Box>

                <Box flex={1} ml={5}>
                  {product.name.length >= 20
                    ? product.name.slice(0, 20) + "..."
                    : product.name}
                </Box>
                <Box fontStyle={"oblique"}>- ${product.price}</Box>
              </Box>
            ))}
          </ul>
        ) : (
          <Box>No item contains related to search</Box>
        )}
      </Box>
    )
  );
}

export default SearchResult;
