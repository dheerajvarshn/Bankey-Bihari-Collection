import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  SlSocialInstagram,
  SlSocialTwitter,
  SlSocialFacebook,
} from "react-icons/sl";

const Footer = () => {
  return (
    <>
      <HStack
        justifyContent={"center"}
        w="100%"
        bg={"black"}
        color="whiteAlpha.600"
        p={10}
        spacing="20%"
      >
        <VStack h="200px">
          <Text color="white" mb="10px" fontStyle="bold">
            LINKS
          </Text>
          <Link to="/product/category/men">Men</Link>
          <Link to="/product/category/women">Women</Link>
          <Link to="/product/category/girls">Girls</Link>
          <Link to="/product/category/boys">Boys</Link>
          <Link to="/product/category/kids">Kids</Link>
        </VStack>
        <Box>
          <Stack h="200px">
            <Text mb="10px" color="white">
              CONTACT
            </Text>
            <Link>Mobile no : 8057642326 / 7017174930</Link>
            <Text>Email : mohitgupta@gmail.com</Text>
            <Text>
              Address:
              <Text fontStyle="italic">CFC choraya,Vrindavan Mathura</Text>
            </Text>
          </Stack>
        </Box>
        <Box>
          <VStack h="200px" gap={2}>
            <Text color="white" mb="10px">
              Social
            </Text>
            <Link>
              <HStack>
                <SlSocialInstagram />
                <i>Instagram</i>
              </HStack>
            </Link>
            <Link>
              <HStack>
                <SlSocialTwitter />
                <i>Twitter</i>
              </HStack>
            </Link>
            <Link>
              <HStack>
                <SlSocialFacebook />
                <i>Facebook</i>
              </HStack>
            </Link>
          </VStack>
        </Box>
      </HStack>
      <HStack justifyContent="center" bgColor="black" color="white">
        <Text fontFamily="cursive" pb="5">
          made by Dheeraj Varshney
        </Text>
      </HStack>
    </>
  );
};

export default Footer;
