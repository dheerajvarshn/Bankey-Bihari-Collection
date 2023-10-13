import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import PriceDetail from "../components/AddToCart/PriceDetail";
import Contact from "./contact";

const Payment = () => {
  const [value, setValue] = React.useState("1");
  return (
    <Box
      bg="gray.200"
      height="auto"
      p={5}
      display="flex"
      justifyContent={"space-between"}
    >
      <Box w="50%">
        <Box margin='auto'>
          <Breadcrumb separator="-">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Login</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Delivery Address</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Link to='/user/order_summary'>
              <BreadcrumbLink href="#">Order Summary</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/user/payment_method">Payment</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Heading
          fontStyle="italic"
          fontSize={30}
          textAlign="center"
          bgGradient="linear(to-l, gray.300, yellow.400, green.200)"
        >
          PAYMENT OPTION
        </Heading>
        <Box h="auto" border="1px" p={3} bg="white" mt={5}>
          <Stack>
            <RadioGroup onChange={setValue} value={value}>
              <Stack gap={5}>
                <HStack>
                  <Box>
                    <Radio value="1">
                      <Image
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif"
                        w="5"
                      />
                    </Radio>
                  </Box>
                  <Text>UPI</Text>
                </HStack>
                <Divider />
                <HStack>
                  <Box>
                    <Radio value="2">
                      <Image
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif"
                        w="5"
                      />
                    </Radio>
                  </Box>
                  <Text>Wallets</Text>
                </HStack>
                <Divider />
                <Box>
                  <Radio value="3">Cresit/Debit/ATM Card</Radio>
                </Box>
                <Divider />
                <Box>
                  <Radio value="4">Cash on Delivery</Radio>
                </Box>
              </Stack>
            </RadioGroup>
          </Stack>
        </Box>
      </Box>
      <Box>
        <Contact />
        <PriceDetail />
      </Box>
    </Box>
  );
};

export default Payment;
