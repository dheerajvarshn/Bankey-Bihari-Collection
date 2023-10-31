import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PriceDetail from "../components/AddToCart/PriceDetail";

import { handlePayment } from "./apis";

const init = {
  name: "",
  number: "",
  email_id: "",
  locality: "",
  pincode: "",
  address: "",
  state: "",
  city: "",
};

const DeliveryAddress = () => {

  const { id } = useParams();

  const token = JSON.parse(localStorage.getItem("Token"));
  const [input, setInput] = useState(init);
  const [issubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [idaddress, setIdAddress] = useState({});
  const [totalprice, setTotalPrice] = useState("");
  const bg = useColorModeValue('gray.50', '#1a202c')

  const cartProduct = useSelector((state) => state.cartReducer.cart);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // fetch address api

  const handleInputSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);
  };

  // Post User Delivary Address
  useEffect(() => {
    let price = 0
    cartProduct.map((el) => (price = price + el.price * el.quantity));
    setTotalPrice(price);


    if (Object.keys(formErrors).length === 0 && issubmit) {
      // const add=(id)?id:"add"
      setLoading(true);
      setTimeout(() => {
        // update address

        if (id) {
          axios
            .put(`https://mern-zvtq.onrender.com/user/address/${id}`, input, {
              headers: {
                Authorization: token,
              },
            })
            .then((result) => {
              setLoading(false);
              // payment method
              handlePayment(totalprice,navigate,dispatch)
              
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        } else {
          // add address
          axios
            .post("https://mern-zvtq.onrender.com/user/address/add", input, {
              headers: {
                Authorization: token,
              },
            })
            .then((result) => {
              setLoading(false);
              // payment method
              handlePayment(totalprice,navigate,dispatch);
              
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, issubmit]);

  // get address by id
  useEffect(() => {
    if (id) {
      axios
        .get(`https://mern-zvtq.onrender.com/user/address/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          console.log(result.data);
          setIdAddress(result.data.address);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (values) => {
    const error = {};
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.name) {
      error.name = "Name is required !";
    } else if (values.name.length < 3) {
      error.name = "Name must be more then 3 character !";
    } else if (values.name.length > 10) {
      error.name = "Name cannot exceed more then 10 character !";
    }

    if (!values.number) {
      error.number = "Number is required";
    } else if (values.number.length < 10 || values.number.length > 10) {
      error.number = "Mobile number must be 10 digit ! ";
    }

    if (!values.email) {
      error.email = "Email ID is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email formate !";
    }

    if (!values.locality) {
      error.locality = "Locality is required";
    }

    if (!values.pincode) {
      error.pincode = "Pincode is required";
    } else if (!values.pincode === 6) {
      error.pincode = "Pincode must be 6 digit";
    }

    if (!values.address) {
      error.address = "Address is required";
    }

    if (!values.state) {
      error.state = "State is required";
    }

    if (!values.city) {
      error.city = "City/District/Town is required";
    }

    return error;
  };

  return (
    <SimpleGrid columns={[1,2]} bg={bg} p={5}  spacing={'20px'}>
      <Box
        h="auto"
        
        ml={5}
        border="1px"
        // bg="white"
        boxShadow={"xl"}
        p={5}
      >
        <Heading fontSize={20} bg="cyan.200" h="10" p={2}>
          DELIVERY ADDRESS
        </Heading>
        <Box>
          <Button colorScheme="red" m={5}>
            <MdLocationPin />
            Use my current location
          </Button>

          <Box m={3}>
            <form id="my-form" onSubmit={handleInputSubmit}>
              <HStack gap={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                    placeholder={idaddress && idaddress.name}
                  />
                  {formErrors.name && (
                    <Text color="red.400">{formErrors.name}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>10 digit mobile number</FormLabel>
                  <Input
                    type="number"
                    name="number"
                    value={input.number}
                    onChange={handleInputChange}
                    placeholder={idaddress && idaddress.number}
                  />
                  {formErrors.number && (
                    <Text color="red.400">{formErrors.number}</Text>
                  )}
                </FormControl>
              </HStack>

              <HStack gap={2} mt={5}>
                <FormControl>
                  <FormLabel>Pincode</FormLabel>
                  <Input
                    type="number"
                    name="pincode"
                    value={input.pincode}
                    onChange={handleInputChange}
                    placeholder={idaddress && idaddress.pincode}
                  />
                  {formErrors.pincode && (
                    <Text color="red.400">{formErrors.pincode}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Locality</FormLabel>
                  <Input
                    type="text"
                    value={input.locality}
                    onChange={handleInputChange}
                    name="locality"
                    placeholder={idaddress && idaddress.locality}
                  />
                  {formErrors.locality && (
                    <Text color="red.400">{formErrors.locality}</Text>
                  )}
                </FormControl>
              </HStack>
              <FormControl mt={5}>
                <FormLabel>Email ID:</FormLabel>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <Text color="red.400">{formErrors.email}</Text>
                )}
              </FormControl>
              <FormControl mt={5}>
                <FormLabel>Address(area aand street)</FormLabel>
                <Input
                  type="text"
                  value={input.address}
                  onChange={handleInputChange}
                  h={20}
                  name="address"
                  placeholder={idaddress && idaddress.address}
                />
                {formErrors.address && (
                  <Text color="red.400">{formErrors.address}</Text>
                )}
              </FormControl>

              <HStack gap={2} my={5}>
                <FormControl>
                  <FormLabel>City/District/Town</FormLabel>
                  <Input
                    type="text"
                    value={input.city}
                    name="city"
                    onChange={handleInputChange}
                    placeholder={idaddress && idaddress.city}
                  />
                  {formErrors.city && (
                    <Text color="red.400">{formErrors.city}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    value={input.state}
                    name="state"
                    onChange={handleInputChange}
                    placeholder={idaddress && idaddress.state}
                  />
                  {formErrors.state && (
                    <Text color="red.400">{formErrors.state}</Text>
                  )}
                </FormControl>
              </HStack>
              <Button type="submit" colorScheme={"red"} form="my-form" >
                {loading ? (
                  <CircularProgress
                    isIndeterminate
                    color="red.400"
                    size="30px"
                  />
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Box ml={{base:'5'}}>
        <PriceDetail />
      </Box>
    </SimpleGrid>
  );
};

export default DeliveryAddress;
