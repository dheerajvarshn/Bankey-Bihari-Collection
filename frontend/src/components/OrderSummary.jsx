import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartProduct = useSelector((state) => state.cartReducer.cart);
  return (
    <Box>
      {cartProduct.length && (
        <Box>
          <Box>
            {cartProduct.map((item) => (
              <Box padding={5} display="flex" gap={5} key={item._id}>
                <Box boxShadow="xl" h="300px" pt={3} w="90%">
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
                            {/* <BiRupee /> */}
                          </Text>
                          <Text>
                            {item.price ? Number(item.price) * 2 : "699"}
                          </Text>
                        </HStack>
                        <HStack as="b">
                          <Text mr="-10px">
                            {/* <BiRupee /> */}
                          </Text>
                          <Text>{item.price}</Text>{" "}
                        </HStack>
                        <Text color="green.500">50% Off !</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Text>Delivery in 2 days, </Text>

                      <Text color="green.500"> | Free</Text>
                    </Box>
                  </Box>
                  <Box display="flex" gap={10}></Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderSummary;
