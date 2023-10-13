import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  useToast,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const init = {
  code: "",
  password: "",
  cpassword: "",
};
const ChangePassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState(init);
  const [issubmit, setIsSubmit] = useState(false);

  // sendmail
  const { id } = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/forget-password", { id: id })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && issubmit) {
      if (data.password !== data.cpassword) {
        toast({
          description: "confirm password incorrect",
          position: "top",
          status: "error",
        });
      } else {
        resetPassword();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const error = {};

    if (!values.code) {
      error.code = "code is required !";
    }

    if (!values.password) {
      error.password = "password is required !";
    } else if (values.password.length < 4) {
      error.password = "Password must be more then 4 character !";
    }

    if (!values.cpassword) {
      error.cpassword = "confirm password is required !";
    }
    return error;
  };

  const resetPassword = () => {
    if (id) {
      const body = {
        code: data.code,
        email: id,
        password: data.password,
      };
      axios
        .post("http://localhost:5000/user/reset-password", body)
        .then((result) => {
          // const res = result.data;
          if (result) {
            console.log('password change successfully')
            // toast({
            //   description: `${res.message}`,
            //   status: `${res.status}`,
            //   position:'top'
            // })
            navigate("/");
          } else {
            console.log("something went wrong");
          }
        })
        .catch((err) => {
          toast({ description: "Invalid Data", status: "error" ,position:'top'});
        });
    }
  };

  return (
    <>
      <Flex
        flexDir="column"
        borderColor="blackAlpha.900"
        w="30%"
        m="auto"
        mt={5}
        p={4}
        bgColor="whiteAlpha.700"
        boxShadow="xl"
        gap={5}
      >
        <Heading>New Password ?</Heading>
        <form id="otpform" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>OTP Code</FormLabel>
            <Input
              type="number"
              placeholder="Enter code"
              name="code"
              value={data.code}
              onChange={handleChange}
            />
            {formErrors.code && <Text color="red">{formErrors.code}</Text>}
          </FormControl>
          <FormControl>
            <FormLabel mt={2}>New password</FormLabel>
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
          <FormControl>
            <FormLabel mt={2}>Confirm password</FormLabel>
            <Input
              placeholder="Confirm Password"
              name="cpassword"
              value={data.cpassword}
              onChange={handleChange}
            />
            {formErrors.cpassword && (
              <Text color="red">{formErrors.cpassword}</Text>
            )}
          </FormControl>

          <HStack justifyContent="center" gap={5} my={4}>
            <Button type="submit" form="otpform" colorScheme={"yellow"}>
              Send
            </Button>
            <Link to="/login">
              <Button colorScheme={"red"}>Back</Button>
            </Link>
          </HStack>
        </form>
      </Flex>
    </>
  );
};

export default ChangePassword;
