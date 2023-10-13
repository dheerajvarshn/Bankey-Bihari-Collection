import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Icon,
  Skeleton,
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

const SubCategory = () => {

  const [products, setProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { category,subcategory } = useParams();

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category,subcategory]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);

  const getProduct = () => {
    axios
      .get(`http://localhost:5000/product/category/${category}/${subcategory}`)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Navbar />
      < SearchResult/> 
      <Heading
        fontSize={30}
        // bg="gainsboro"
        width="30%"
        mb={5}
        fontStyle="sarif"
        ml={10}
      >
        {category.toUpperCase()} FASHION
      </Heading>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={2}
        mx="30px"
        padding={5}
        textAlign="center"
        gridRowGap="20px"
      >
        {products &&
          products.map((product, index) => (
            <Skeleton height="100%" isLoaded={isLoaded}>
              <Link to={`/product/category/subcategory/${product._id}`}>
                <GridItem
                  textAlign={"center"}
                  key={product._id}
                  mb={2}
                  border="1px"
                  boxShadow="xl"
                  p="6"
                  rounded="xl"
                  height="100%"
                  // bg="white"
                  w="90%"
                >
                  <Box>
                    <Image
                     boxSize="200px"
                     border='1px '
                     src={product.image}
                     alt="Dan Abramov"
                     m="auto"
                     pb={3}
                     mb='5'
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
      <Footer />
    </Box>
  );
};

export default SubCategory;

