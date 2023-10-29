import {
  Box,
  GridItem,
  Heading,
  Image,
  Icon,
  Skeleton,
  SimpleGrid,
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

const SubCategory = () => {
  const [page, setPage] = useState("");
  const [products, setProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { category, subcategory } = useParams();

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);

  const getProduct = () => {
    axios
      .get(`https://mern-zvtq.onrender.com/product/category/${category}/${subcategory}`)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const productPerPage = (p) => {
    setPage(p);
  };

  return (
    <Box>
      <Navbar />
      <SearchResult />
      <Box
        fontSize={30}
        bg="gainsboro"
        mb={5}
        p={1}
        fontStyle="sarif"
        ml={5}
        
      >
        {category.toUpperCase()} FASHION
      </Box>
      {products && (
        <>
          <SimpleGrid spacing={'5px'} minChildWidth='200px' p={2} ml={5} >
            {products.slice(page * 8 - 8, page * 8).map((product, index) => (
              <Skeleton height="100%" isLoaded={isLoaded}>
                <Link to={`/product/category/subcategory/${product._id}`}>
                  <GridItem
                   _hover={{backgroundColor:'red.100'}}
                    textAlign={"center"}
                    mb={2}
        
                    boxShadow="xl"
                    p="6"
                    rounded="xl"
                    height="90%"
                    // bg="white"
                    w="80%"
                  >
                    <Box key={product._id} >
                      <Image
                        boxSize=" 150px "
                        src={product.image}
                        alt="Dan Abramov"
                        m="auto"
                        // pb={3}
                        mb="5"
                       
                        objectFit={'fill'}
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
          </SimpleGrid>
          <Box>
            <Pagination products={products} productPerPage={productPerPage} />
          </Box>
        </>
      )}
      <Footer />
    </Box>
  );
};

export default SubCategory;
