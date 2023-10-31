import {
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";

const PriceDetail = () => {
  const [total, setTotal] = useState(0);
  const bg = useColorModeValue('white', '#1a202c')

  const cartProduct = useSelector((state) => state.cartReducer.cart);

  const getPrice = () => {
    let price = 0;
    if (cartProduct.length) {
      cartProduct.map((el) => (price = price + (el.price * el.quantity)));
      setTotal(price);
    }
  };
  useEffect(() => {
    getPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });


  return (
    <>
      {cartProduct.length && (
        <Box>
          <VStack bg={bg} border='1px' mr={5}  boxShadow="xl" gap={5}>
            <Heading fontSize="20px" mt={5}>
              PRICE DETAILS
            </Heading>
            <Divider w={["200px","400px"]} />

            <HStack spacing={150}>
              <Text>Price({cartProduct.length} item)</Text>
              <HStack>
                <Text mr="-10px">
                  <BiRupee />
                </Text>
                <Text>{total}</Text>
              </HStack>
            </HStack>

            <HStack spacing={180}>
              <Text>Discount</Text>
              <HStack>
                <Text>50%</Text>
              </HStack>
            </HStack>

            <HStack spacing={150}>
              <Text>Delivery Charges</Text>
              <Text color="green.500">FREE</Text>
            </HStack>
            <Divider />
            <HStack color="green">
              <Text>You will save</Text>
              <BiRupee />
              <Text>{total} on this order</Text>
            </HStack>
            <HStack spacing={150}>
              <Text fontWeight="500">TOTAL AMOUNT</Text>
              <HStack fontWeight="500">
                <Text mr="-10px">
                  <BiRupee />
                </Text>
                <Text>{total}</Text>
              </HStack>
            </HStack>
            <Divider />
          </VStack>
        </Box>
      )}
    </>
  );
};

export default PriceDetail;
