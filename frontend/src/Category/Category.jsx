import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Icon,
  Skeleton
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FcRating } from "react-icons/fc";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchResult from "../components/SearchBox/searchresult";
import Pagination from "../components/Pagination";


const Category = () => {
  const [page, setPage] = useState("");
  const [products, setProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/category/${category}`)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);

  const productPerPage = (p) => {
    console.log(p);
    setPage(p);
  };

  return (
    <Box>
      <Navbar />
      <SearchResult/>
      <Heading
        fontSize={30}
        // bg="gainsboro"
        width="30%"
        fontStyle="italic"
        ml={12}
        pl={5}
      >
        {category.toUpperCase()} FASHION
      </Heading>
      {products && (
        <>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={2}
            mx="30px"
            padding={5}
            justifyContent="center"
            gridRowGap="20px"
          >
            {products.slice(page * 8 - 8, page * 8).map((product, index) => (
              <Skeleton height="100%" isLoaded={isLoaded}>
                <Link to={`/product/category/subcategory/${product._id}`}>
                  <GridItem
                   _hover={{backgroundColor:'red.100'}}
                    textAlign={"center"}
                    mb={2}
                    border="1px"
                    boxShadow="xl"
                    p="6"
                    rounded="xl"
                    height="90%"
                    // bg="white"
                    w="80%"
                  >
                    <Box key={product._id}>
                      <Image
                        boxSize=" 150px "
                        src={product.image}
                        alt="Dan Abramov"
                        m="auto"
                        
                        mb="5"
                      />
                      <Heading fontSize={"20px"}>{`${product.name.substr(
                        0,
                        30
                      )}`}</Heading>
                      <Box>
                        <Icon as={BiRupee} boxSize={3} />
                        {product.price}.<span>00</span>
                      </Box>
                      <Box>
                        {" "}
                        <Icon as={FcRating} boxSize={4} />
                        {product.rating}
                      </Box>
                    </Box>
                  </GridItem>
                </Link>
              </Skeleton>
            ))}
          </Grid>
          <Box>
            <Pagination products={products} productPerPage={productPerPage} />
          </Box>
        </>
      )}
      <Footer />
    </Box>
  );
};

export default Category;
