import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Icon,
  Skeleton,
  HStack,
  Button,
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


const Category = () => {
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
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={2}
        mx="30px"
        padding={5}
        textAlign="center"
        gridRowGap="20px"
        // bg="gray.50"
      >
        {products &&
          products.map((product) => (
            <Skeleton height="100%" isLoaded={isLoaded}>
              <Link to={`/product/category/subcategory/${product._id}`}>
                <GridItem
                  textAlign={"center"}
                  key={product._id}
                  mb={2}
                  border="1px"
                  borderStyle="revert"
                  boxShadow="2xl"
                  p="6"
                  rounded="xl"
                  height="100%"
                  // bg="white"
                  w="90%"
                >
                  <Box>
                    <Image
                      boxSize="200px"
                      src={product.image}
                      alt="Dan Abramov"
                      m="auto"
                      mb={5}
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
                      <Icon as={FcRating} boxSize={4} ml="-5" />{" "}
                      {product.rating}
                    </Box>
                  </Box>
                </GridItem>
              </Link>
            </Skeleton>
          ))}
      </Grid>
      <Box>
        <HStack justify={'center'} mb={'5'}>
                  <Button> {'<'}Prev</Button>

                  <Button>Next {'>'}</Button>
        </HStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Category;
