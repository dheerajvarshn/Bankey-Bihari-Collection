import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {searchProducts,} from "../../Action/searchProduct";
import { useNavigate } from "react-router-dom";
import { showSuggestion } from "../../Action/suggestionBox";

const Searchbox = () => {
    const navigate = useNavigate()
    const [key,setKey] = useState('')
    const dispatch =useDispatch()
    const {loading} = useSelector(state=>state.searchReducer)

    useEffect(()=>{
      const delayTimer = setTimeout(() => {
        if (key.trim() !== '') {
          dispatch(showSuggestion(true))
          dispatch(searchProducts(key))
        }else{
          dispatch(showSuggestion(false))
        }

      }, 2000);
      
      return () => clearTimeout(delayTimer); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[key]) 

    const handleSearch = async() =>{
      if (key.trim() !== '') {
        dispatch(showSuggestion(false))
        dispatch(searchProducts(key))
        navigate(`/search_product_page/${key}`)
      }
      
    }
    
    const handleKeyPress =(e)=>{
      if (e.key === 'Enter') {
        handleSearch();
      }
    }
    
    

  return (
    <Box mt={2}>
      <Box className="search-wrapper" display={'flex'}>
        <Box className="form-group" mb={2} display={'flex'} justifyContent={'space-between'}>
          <Input
            type={"text"}
            placeholder="Search mens,womens,kids latest clothes"
            borderColor="red.200"
            value={key}
            onKeyDown={handleKeyPress}
            onChange={(e)=>setKey(e.target.value) }
          />
          <Box>
            {loading && <Spinner color='red.500' /> }
          </Box>
        </Box>
        <Box ml={2}>
          <IconButton className="search-btn" aria-label="Search database" icon={<SearchIcon />} onClick={handleSearch}/>
        </Box>
      </Box>
      </Box>
  );
};

export default Searchbox;
