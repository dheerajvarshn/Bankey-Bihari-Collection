import {
  Box,
  Heading,
  Image,
  Icon,
  Skeleton,
  Button,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai"
import { FcRating } from "react-icons/fc";

const Product = ({ category }) => {
  const [products, setProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);

  const getProduct = () => {
    axios
      .get(`http://localhost:5000/product/category/${category}`)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(products);
  return (
    <Box>
      <HStack justifyContent='space-between' mr='20px'>
      <Box fontSize={30} color="cyan.500" fontStyle='oblique' ml={10}>
        {category.toUpperCase()} FASHION
      </Box>
      <Box>
        <Link to={`/product/category/${category}`}><Button>View more{AiOutlineArrowRight}</Button></Link>
      </Box>
      </HStack>
      <Box display='grid' gridAutoRows='auto' gridTemplateColumns='repeat(4,1fr)'  mx="30px" gap='2' gridRow={3}     
        padding={2}
        textAlign="center"
      >
        {products &&
          products.map((product, index) => (
            <Skeleton height="100%" isLoaded={isLoaded}>
              {index <= 7 && (
                <Link to={`/product/category/subcategory/${product._id}`}>
                  <Box boxShadow="2xl" textAlign={"center"} mb={5}  rounded="xl" border='1px' 
                  //  bg="white"
                    height="100%" w="90%" p='2' >
                    <Box>
                      <Image
                        boxSize="150px"
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
                        <Icon as={FcRating} boxSize={4} />
                        {" "}
                        {product.rating}
                      </Box>
                    </Box>
                    </Box>
                </Link>
              )}
            </Skeleton>
          ))
          }
      </Box>
    </Box>
  );
};

export default Product;
