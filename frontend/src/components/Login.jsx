import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Box,
  useToast,
  HStack,
  Checkbox,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
// import {gapi} from 'gapi-script'
import axios from "axios";
import {useDispatch} from 'react-redux'
// import { GoogleLogin } from 'react-google-login';
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./Signup";
import { ForgetPasswordModal } from "./forgetPassword/ForgetPassword";
import { AuthDetail } from "../Action/Auth";


const init = {
  email: "",
  password: ""
};

const Login = () => {
  const toast = useToast()
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState(init);
  // const clientId="154367099312-8rnd98dsftseg9hcbjna7qvemq7bjo8d.apps.googleusercontent.com"
  const [issubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const bg=useColorModeValue('whiteAlpha.700','#1a202c')

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("Token"));
  //   console.log(token);
  //   if(token){ 
  //   axios
  //     .get("http://localhost:5000/auth/protected", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  //   }, [navigate]);

  const loginData = (data) => {
    axios
      .post("http://localhost:5000/auth/login", data)
      .then((user) => {        
        localStorage.setItem("Token", JSON.stringify(user.data.token));
        dispatch(AuthDetail(user.data.user))
        setData(init)
        toast({description:"login successfull",position:'top',status:'success',duration:'3000'});
        navigate("/")
      })
      .catch((err) => {
        const error = err.response.data
        error ? toast({ description : error ,status:'error'}):
        toast({ description:"Invalid User",status:'error'})
      }

      )
  };

  // useEffect(()=>{
  //   gapi.load("client:auth2",()=>{
  //     gapi.auth2.init({clientId:clientId})
  //   })
  // },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:value
    })
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && issubmit) {
      console.log(data)
      loginData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[formErrors]);

  const validate = (values) => {
    const error = {};
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.email) {
      error.email = "Email ID is required !";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email formate !";
    }

    if (!values.password) {
      error.password = "password is required !";
    } else if (values.password.length < 4) {
      error.password = "Password must be more then 4 character !";
    } else if (values.password.length > 10) {
      error.password = "password cannot exceed more then character !";
    }
    return error;
  };

  // const responseSuccessGoogle = (response) => {
  //   console.log(response);
  //   axios.post('http://localhost:5000/auth/googlelogin',{"tokenId":response.tokenObj.id_token}).then(result=>{
  //     console.log(result.data)
  //     localStorage.setItem("Token", JSON.stringify(result.data.token));
  //     dispatch(AuthDetail(result.data.user))
  //     setData(init)
  //     toast({description:"login successfull",position:'top',status:'success',duration:'3000'});
  //     navigate("/")
  //   }).catch(((err)=>{
  //     console.log(err)
  //   }))
  // }

  // const responseFaliureGoogle=(response)=>{
  //   console.log(response)
  // }

  return (
    <Flex
      flexDir="column"
      borderColor="white"
      w="30%"
      m="auto"
      mt={5}
      p={4}
      bgColor={bg}
      mb={5}
      border='1px'
      boxShadow="xl"
      gap={5}
    >
      <Text fontSize="30px" fontWeight="bold">
        Login
      </Text>
      <form id="my-form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type={"email"}
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {formErrors.email && <Text color="red">{formErrors.email}</Text>}
        </FormControl>
        <FormControl>
          <FormLabel mt={2}>Password</FormLabel>
          <Input
            placeholder="Enter Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <Text color="red">{formErrors.password}</Text>
          )}
        </FormControl>
      </form>
      <HStack justifyContent='space-between'>
      <Checkbox >Remember me</Checkbox>
      <ForgetPasswordModal />
      </HStack>
      <Button type="submit" mt={4} form="my-form" bgColor='yellow.300'>
        Submit
      </Button>
      <HStack>
        <Divider />
        <Text as='b' >or</Text>
        <Divider/>
      </HStack>
      <HStack justifyContent='center'>
      {/* <GoogleLogin
      clientId={clientId}
    buttonText="Login with Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseFaliureGoogle}
    cookiePolicy={'single_host_origin'}
    /> */}
      </HStack>
      <Box fontFamily="cursive" textAlign={"center"}>
        <Signup />
      </Box>
    </Flex>
  );
}

export default Login;
