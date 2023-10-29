import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
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
import { IoIosStarHalf } from "react-icons/io";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import Footer from "./Footer";
import { Add } from "../Action";
import { useDispatch } from "react-redux";
import Reviews from "./reviews";
import SearchResult from "./SearchBox/searchresult";
import SimilarItems from "./SimilarItems";

const ProductDetail = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  // const cartProduct = useSelector((state) => state.cartReducer.cart);
  const bg = useColorModeValue("gray.50", "#1a202c");
  // const detailbg = useColorModeValue("orange.100", "#1a202c");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    const getData = () => {
      axios
        .post(`https://mern-zvtq.onrender.com/product/category/subcategory/${_id}`)
        .then((result) => {
          console.log(data);
          setData(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  const handleSubmit = (item) => {
    token ? AddToCart(item) : navigate("/login");
  };

  // add to cart
  const AddToCart = (item) => {
    dispatch(Add(item));
    navigate("/add_to_cart");
  };

  // rating and star
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;

    return (
      <Box key={index}>
        {data.rating &&
          (data.rating >= index + 1 ? (
            <AiFillStar color="gold" />
          ) : data.rating >= number ? (
            <IoIosStarHalf color="gold" />
          ) : (
            <AiOutlineStar color="gold" />
          ))}
      </Box>
    );
  });
  return (
    <Box>
      <Navbar />
      <SearchResult />
      {data && (
        <Box
          display={{md:'flex'}}
          justifyContent="space-between"
          bg={bg}
          p={5}
          gap={5}
        >
          <Box>
            <Box marginLeft={10} height={["30rem",null,"50rem"]} w={['20rem',null,'30rem']}  mb={5}>
              <Box>
                <Image

                  src={data.image}
                  border={"1px"}
                  borderColor={"gray.200"}
                  width={["20em","30em","40em","50em"]}
                />
              </Box>

              <SimpleGrid
                textAlign="center"
                columns={[1,2]}
                spacing={'40px'}
                p={5}
              
                
                mt="20px"
                gap="10px"
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
              </SimpleGrid>
            </Box>
          </Box>
          <Box border={"1px"} borderColor={"gray.200"}>
            <Box bg={"white"} p={5}>
              <Heading>{data.brand}</Heading>
              <Box color={"gray.400"}>{data.slug}</Box>

              <Text display="flex" my={3}>
                <HStack>
                  {ratingStar}
                  <Text fontWeight={"200"} fontSize={"10px"}>
                    ({data.reviews} costumer reviews)
                  </Text>
                </HStack>
              </Text>
              <Divider color={"gray.200"} />

              {/* Price */}
              <Box display={"flex"} gap={5} my={3}>
                <Box display={"flex"}>
                  <BiRupee fontSize={20} s />
                  <Text fontSize={20} fontWeight={"bold"}>
                    {data.price}.00
                  </Text>
                </Box>

                <Box display={"flex"}>
                  <Text>MRP</Text>
                  <BiRupee />
                  <Box
                    textDecoration={"line-through"}
                    color={"gray.400"}
                    textDecorationColor={"gray.400"}
                  >
                    7999
                  </Box>
                </Box>
                <Box color={"orange.500"}>( 75% OFF )</Box>
              </Box>
              <Text color={"green.200"} mt={2}>
                Inclusive of all taxes
              </Text>

              {/* More Color */}
              <Box fontFamily={"body"} fontSize="20px" my={3}>
                More Color
              </Box>
              <RadioGroup defaultValue="red">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="red">
                    Red
                  </Radio>
                  <Radio colorScheme="green" value="green">
                    Green
                  </Radio>
                  <Radio colorScheme='blackAlpha' value="black">
                    Black
                  </Radio>
                  <Radio colorScheme='yellow' value="yellow">
                    Yellow
                  </Radio>
                </Stack>
              </RadioGroup>

              {/* select size */}
              <Box>
                
              </Box>

              <Text display="flex" mt={2}>
                <HStack>
                  <Text>
                    <Box fontWeight={"200px"}>Description :</Box>

                    {data.description}
                  </Text>
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
              <Reviews product={data}/>
            </Box>
          </Box>
        </Box>
      )}
      <SimilarItems product={data} />
      <Footer />
    </Box>
  );
};

export default ProductDetail;
