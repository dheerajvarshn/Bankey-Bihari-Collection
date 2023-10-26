import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { token } from "../components/Token";
import DeliveryAddress from "./DeliveryAddress";


const AddressForm = () => {
  const [addressdoc, setAddressdoc] = useState([]);
  const bg = useColorModeValue('gray.50', '#1a202c')

  const navigate=useNavigate()
  // fetch address api

  function getAllAddress() {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      axios
        .get("https://mern-zvtq.onrender.com/user/address", {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setAddressdoc(result.data.addresses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getAllAddress();
  }, []);

  const updateAddress=(id)=>{
    navigate(`/user/address/update/${id}`)
  }

  const removeAddress=(id)=>{
    axios.delete(`https://mern-zvtq.onrender.com/user/address/delete/${id}`,{
        headers:{
            "Authorization":token
        }
    }).then((result)=>{
        console.log(result.data)
        getAllAddress()
    }).catch((err)=>console.log(err))
  }

  return (
    <Box display='flex' bg={bg} p={5} gap={10} justifyContent='center'>
      {addressdoc.length ? (
        <Box h="auto" w="60%"   boxShadow={"xl"} p={5}>
          <Heading fontSize={20} bg="cyan.200" h="10" p={2}>
            DELIVERY ADDRESS
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={3} m="3" w="auto" >
            {addressdoc.map((item) => (

              <GridItem key={item._id} cursor='pointer' >
                <Box border={"1px"} p="3">
                  <Text display="flex" as="p">
                    <Text as="b" >Name :</Text>
                    {item.name}
                    
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">Number : </Text>
                    {item.number}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">EmailId :</Text>
                    {item.email}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">Pincode :</Text>
                    {item.pincode}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">Locality :</Text>
                    {item.locality}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">State :</Text>
                    {item.state}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">City/area/district :</Text>
                    {item.city}
                  </Text>
                  <Text display="flex" as="p">
                    <Text as="b">address :</Text>
                    {item.address}
                  </Text>
                  <Box>
                    <Button colorScheme="orange" size="sm" onClick={()=>updateAddress(item._id)}>
                      Update
                    </Button>
                    <Spacer />
                    <Button colorScheme="red" size="sm" my={3} onClick={()=>removeAddress(item._id)}>
                      Remove
                    </Button>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
          <Link to='/user/address/add'>
            <Box textAlign={'center'} >

          <Button colorScheme='yellow'>ADD NEW</Button>
            </Box>
          </Link>
        </Box>
      ) : (
        <DeliveryAddress />
      )}
    </Box>
  )
}

export default AddressForm
