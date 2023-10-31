import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useColorMode,

  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMoon } from "react-icons/hi";
import { MdLightMode } from "react-icons/md";
import logo from "../images/1.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { AuthDetail, DeleteAuth } from "../Action/Auth";
import { clearCart } from "../Action";
import Profile from "./Profile";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = JSON.parse(localStorage.getItem("Token"));
  const auth = useSelector((state) => state.authReducer.Auth);
  console.log(auth)

  

  const getData = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [Token, setToken] = useState(false);
  const toast = useToast();

  useEffect(()=>{
    dispatch(AuthDetail())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (token) {
      setToken(true);
    }
  });

  const logout = () => {
    dispatch(DeleteAuth());
    dispatch(clearCart());
    localStorage.removeItem("Token");
    setToken(false);
  };


  return (
    <Flex
      h="70px"
      // bgGradient="linear(to-r,#c5f8d7, #cd90af)"
      bgGradient="linear-gradient(to right, #d59c9c, #835c5c)"
      minWidth="max-content"
      alignItems="center"
      gap="2"
    >
      <Link to="/">
        <Image
          borderRadius="full"
          ml={10}
          boxSize={['25px','50px']}
          src={logo}
          alt="soory"
        />
      </Link>
      <Text
        p={2}
        color="red.200"
        bgClip="text"
        fontSize={['sm', "md", "40px"]}
        fontWeight="extrabold"
        letterSpacing="2px"
        fontFamily={"sans"}
        textColor="#d6ffde"
      >
        Bankey Bihari Collection
      </Text>
      <Spacer />

      <Box display={{ base:'none', lg: 'block'}}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MdLightMode /> : <HiOutlineMoon />}
        </Button>
      </Box>
      <Box display="flex">
        {Token ? (
          <Button
          display={{ base:'none', md: 'block'}}
            colorScheme="teal"
            mr={4}
            h="30px"
            mt="10px"
            fontFamily="monospace"
            onClick={logout}
          >
            Log out
          </Button>
        ) : (
          <Link to="/login">
            <Button 
            display={{ base:'none', md: 'block'}}
              colorScheme="teal"
              mr={4}
              h="30px"
              mt="10px"
              fontFamily="monospace"
            >
              Log in
            </Button>
          </Link>
        )}

        <Link to={"/add_to_cart"}>
          <Box display={"flex"} fontSize="40px" mt={1} mr={3}>
            <AiOutlineShoppingCart />
            <Badge
              ml="6"
              bgColor={"white"}
              color="green.500"
              pos="absolute"
              borderRadius={5}
            >
              {getData.length}
            </Badge>
          </Box>
        </Link>
        {Object.keys(auth).length!==0 ? (
 
            <Profile/>
        ) : (
          <Box
            onClick={() =>
              toast({
                title: "Bankey Bihari Collection",

                description: "You are not Login !",
                status: "error",
                position: "top",
                isClosable: true,
              })
            }
            cursor="pointer"
          >
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              mr={5}
            />
            
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
