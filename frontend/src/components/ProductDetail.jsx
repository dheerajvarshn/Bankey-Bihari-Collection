import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BiRupee } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FcRating } from "react-icons/fc";
import { AiOutlineShoppingCart, AiOutlineThunderbolt } from "react-icons/ai";
import Footer from "./Footer";
import { Add } from "../Action";
import { useDispatch} from "react-redux";
import Reviews from "./reviews";
import SearchResult from "./SearchBox/searchresult";
import SimilarItems from "./SimilarItems"

const ProductDetail = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  // const cartProduct = useSelector((state) => state.cartReducer.cart);
  const bg = useColorModeValue("gray.50", "#1a202c");
  const detailbg = useColorModeValue("orange.100", "#1a202c");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { _id } = useParams();


 useEffect(()=> { 
  const getData = () => {
    axios
      .post(`http://localhost:5000/product/category/subcategory/${_id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getData()
 },[_id])

  const handleSubmit = (item) => {
    token ? AddToCart(item) : navigate("/login");
  };

  // add to cart
  const AddToCart = (item) => {
    dispatch(Add(item));
    navigate("/add_to_cart");
  };
  return (
    <Box >
      <Navbar />
      <SearchResult/>
      {data && (
        <Box
          display={"flex"}
          justifyContent="space-between"
          bg={bg}
          p={5}
          gap={5}
          height={'40rem'}
        >
          <Box width="55%">
            <Box marginLeft={20}
            height={'50rem'}
            >
              <Image src={data.image} w="90%"  maxH={'30em'}/>
              <Box
                textAlign="center"
                display={"flex"}
                justifyContent="center"
                mt="20px"
                gap="20px"
              
              >
                <Button
                  colorScheme="orange"
                  size="md"
                  boxShadow="2xl"
                  p="6"
                  rounded="md"
                  _hover={{ border: "2px solid yellow" }}
                  onClick={() => handleSubmit(data)}
                >
                  <AiOutlineShoppingCart /> Add To Cart
                </Button>
                {/* <Link to="buy-now"> */}
                <Button
                  colorScheme="red"
                  size="md"
                  boxShadow="2xl"
                  p="6"
                  rounded="md"
                  _hover={{ border: "2px solid red" }}
                  onClick={() => handleSubmit(data)}
                >
                  <AiOutlineThunderbolt /> Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
          <Box overflowY="scroll" w="50%" height={'35rem'} p={1}>
            <Box bg={detailbg} p={5}>
              <Heading>{data.name}</Heading>

              <Text fontFamily="fantasy" display="flex" my={3}>
                Price :
                <HStack>
                  <BiRupee />
                  <Text fontSize={20}>{data.price}.00</Text>
                </HStack>
              </Text>

              <Text as="bold" display="flex" my={3}>
                Brand :
                <HStack>
                  <Text>{data.brand ? data.brand : "Nike"}</Text>
                </HStack>
              </Text>

              <Text display="flex" my={3}>
                <HStack>
                  <FcRating />
                  <b>{data.rating}</b>
                </HStack>
              </Text>

              <Text display="flex" mt={2} fontFamily="heading">
                <HStack>
                  <Text>Reviews:</Text>
                  <Text>{data.reviews}</Text>
                </HStack>
              </Text>

              <Text display="flex" mt={2}>
                <HStack>
                  <Text>Description : {data.description}</Text>
                </HStack>
              </Text>

              <Text as="bold" display="flex" mt={4}>
                Category :
                <HStack>
                  <Text>{data.category}</Text>
                </HStack>
              </Text>

              <Text fontStyle="semi-bold" display="flex" mt={4}>
                <Text>Stock : Only {data.quantity} left</Text>
              </Text>

              
            </Box>
              <Box>
                <Reviews />
              </Box>
          </Box>
        </Box>
      )}
      <SimilarItems />
      <Footer />
    </Box>
  );
};

export default ProductDetail;
