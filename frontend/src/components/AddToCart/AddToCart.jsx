import { Box, Button, Heading, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../Navbar";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PriceDetail from "./PriceDetail";
import { Delete, Add, Decreament } from "../../Action/index";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import emptyCart from '../../images/emptycart.png'
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import SearchResult from "../SearchBox/searchresult";


const AddToCart = () => {

  const token=JSON.parse(localStorage.getItem('Token'))
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const bg = useColorModeValue('gray.50', '#1a202c')
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = weekday[d.getDay() + 2];
  const cartProduct = useSelector((state) => state.cartReducer.cart);
 
  // Delete Cart Product
  const productRemove = (id) => {
    dispatch(Delete(id));
  };

  //   post cart data in database
  useEffect(() => {
    if(token){
      const body = {
        cartItems: cartProduct
      }
      axios
    .post("http://localhost:5000/user/cart/addtocart", body, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  },[cartProduct, token])

  // place order
  const placeOrder = () => {
    if (!token) {
      alert("you are not Login");
    } else {
      navigate('/delivary_address')
    }
  };

  return (
    <Box 
    bg={bg}
    >
      <Navbar />
       < SearchResult/> 
      {cartProduct.length ? (
        <Box display={"flex"} >
          <Box>
            {cartProduct.map((item) => (
              <Box padding={5} display="flex" gap={5} key={item._id}>
                <Box boxShadow="xl" h="300px" pt={3} w='90%'>
                  <Box m={5} display="flex" gap={5}>
                    <Image
                      src={item.image}
                      alt="Dan Abramov"
                      boxSize="200px"
                      w="40%"
                    />
                    <Box>
                      <Heading fontSize={15} w="90%" mb={3}>
                        {item.name}
                      </Heading>
                      <Text as="p" display="flex">
                        Size: <Text>M</Text>
                      </Text>
                      <Text mt={3}>
                        Seller :{" "}
                        <span>{item.brand ? item.brand : "TRIPP"}</span>
                      </Text>

                      <HStack as="p" mt={6}>
                        <HStack as="del" color="blackAlpha.500" fontSize={15}>
                          {" "}
                          <Text mr="-10px">
                            <BiRupee />
                          </Text>
                          <Text>
                            {item.price ? Number(item.price) * 2 : "699"}
                          </Text>
                        </HStack>
                        <HStack as="b">
                          <Text mr="-10px">
                            <BiRupee />
                          </Text>
                          <Text>{item.price}</Text>{" "}
                        </HStack>
                        <Text color="green.500">50% Off !</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Text>Delivery in 2 days,{day} </Text>

                      <Text color="green.500"> | Free</Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap={10}>
                    <HStack pl={5}>
                      <Button
                        bg="blue.200"
                        onClick={() => dispatch(Decreament(item._id))}
                      >
                        -
                      </Button>
                      <Box w={8} h={6} border="1px" textAlign="center">
                        {item.quantity}
                      </Box>
                      <Button
                        bg="blue.200"
                        onClick={() => dispatch(Add(item))}
                      >
                        +
                      </Button>
                    </HStack>
                    <Link>
                      <Text _hover={{ color: "blue" }} as="b">
                        SAVE FOR LATER
                      </Text>
                    </Link>
                    <Text
                      _hover={{ color: "blue" }}
                      fontWeight={400}
                      onClick={() => productRemove(item._id)}
                      cursor="pointer"
                    >
                      REMOVE
                    </Text>
                  </Box>
                  <Link to="/delivary_address">
                    <Box
                      mt={5}
                      h={20}
                      display="flex"
                      justifyContent="center"
                      mr="30px"
                    ></Box>
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            {<PriceDetail />}
            <Box display="flex" justifyContent="center" mt={5}>
            <Button
              bgGradient="linear(to-r, teal.500, green.500)"
              _hover={{ bgGradient: "linear(to-r, red.500, yellow.500)" }}
              onClick={() => placeOrder()}
            >
              PLACE ORDER
            </Button>
          </Box>
            </Box>
        </Box>
      ) : (
        <Box textAlign={'center'} h='auto'>
          <Heading>Cart is Empty</Heading>
          <Link to='/'>
            <ArrowLeftIcon /> Go For Shopping
          </Link>
          <Box justifyContent={'center'} display='flex'>
          <Image  src={emptyCart} alt='Cart Empty'/>
          </Box>
        </Box>
      )}

      <Box textAlign={"center"}>
        <Text as="p" fontSize={13} mt="40px" mb={10} textAlign={"center"}>
          Policies:Returns Policy | Terms of useSecurity | Privacy |
          Infringement ©2007-2022 BankeyBihariCollection.com
        </Text>
      </Box>
      <Footer/>
    </Box>
  );
};

export default AddToCart;
