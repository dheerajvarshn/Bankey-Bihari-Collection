import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Spinner } from "@chakra-ui/react";
import {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../Action/searchProduct";
import { useNavigate } from "react-router-dom";
import { showSuggestion } from "../../Action/suggestionBox";

const Searchbox = () => {
  const navigate = useNavigate();
  const [keyValue, setKeyValue] = useState("");
  const dispatch = useDispatch();
  const searchTimeOutRef = useRef();
  const { loading } = useSelector((state) => state.searchReducer);

// search button
  const handleSearch = () => {
    
    if ( keyValue !== "") {
      dispatch(showSuggestion(false));
      dispatch(searchProducts(keyValue));
      navigate(`/search_product_page/${keyValue}`);
    } 
  };

  const handleKeyPress = (e) => {
    const { key } = e;
    if (keyValue===""){
      dispatch(showSuggestion(false));
      
    }

    if (key === "Enter" && keyValue !== "") {
      dispatch(showSuggestion(false));
           // clear existing timeout
           clearTimeout(searchTimeOutRef.current);
        
           try {
             searchTimeOutRef.current = setTimeout(() => {
               dispatch(searchProducts(keyValue));
               navigate(`/search_product_page/${keyValue}`);
             }, 2000);
           } catch (error) {
             console.log({ error: error });
           }
    } else {
      if (keyValue !== "" && keyValue.length >= 3 && key !== "Enter") {

        dispatch(showSuggestion(true));
        // clear existing timeout
        clearTimeout(searchTimeOutRef.current);

        try {
          searchTimeOutRef.current = setTimeout(() => {
            dispatch(searchProducts(keyValue));
          }, 2000);
        } catch (error) {
          console.log({ error: error });
        }
      } else {
        dispatch(showSuggestion(false));
      }
    }
  };

  return (
    <Box mt={2}>
      <Box className="search-wrapper" display={"flex"}>
        <Box
          className="form-group"
          mb={2}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Input
            type={"text"}
            placeholder="Search mens,womens,kids latest clothes"
            borderColor="red.200"
            value={keyValue}
            onKeyUp={handleKeyPress}
            onChange={(e) => setKeyValue(e.target.value)}
          />
          <Box>{loading && <Spinner color="red.500" />}</Box>
        </Box>
        <Box ml={2}>
          <IconButton
            className="search-btn"
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={handleSearch}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Searchbox;
