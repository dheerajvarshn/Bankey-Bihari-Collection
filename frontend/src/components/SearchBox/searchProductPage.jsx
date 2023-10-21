/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import SearchResult from "./searchresult";
import Footer from "../Footer";
import CommonProductPage from "../CommonProduct";
import { useParams } from "react-router-dom";
import { searchProducts } from "../../Action/searchProduct";

function SearchProductPage() {
  const { searchitem } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  const [products, setProducts] = useState([]);
  const { searchResult } = useSelector((state) => state.searchReducer);
  const { filterResult } = useSelector((state) => state.filterReducer);
  const searchTimeOutRef = useRef();

  useEffect(() => {
    dispatch(searchProducts(searchitem));
  }, [searchitem]);

  useEffect(() => {
    if (searchResult.length === "") {
      return products;
    } else if (searchResult[0]) {
      setProducts(searchResult[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  useEffect(() => {
    // clear existing timeout
    clearTimeout(searchTimeOutRef.current);

    setIsLoaded(false);
    try {
      searchTimeOutRef.current = setTimeout(() => {
        setIsLoaded(true);
        setProducts(filterResult);
      }, 2000);
    } catch (error) {
      console.log({ error: error });
    }
  }, [filterResult]);

  return (
    <Box>
      <Navbar />
      <SearchResult />
      <CommonProductPage products={products} isLoaded={isLoaded} />

      <Footer />
    </Box>
  );
}

export default SearchProductPage;
