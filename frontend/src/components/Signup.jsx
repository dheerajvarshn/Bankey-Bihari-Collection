import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useToast,
  Heading,
  HStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthDetail } from "../Action/Auth";

const init = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

function Signup() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState(init);
  const toast = useToast();
  const [formErrors, setFormErrors] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const googleAuth = () => {
    window.open("https://mern-zvtq.onrender.com/auth/google/callback", "_self");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(profile));
    console.log(formErrors);
    setIssubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && issubmit) {
      axios
        .post("https://mern-zvtq.onrender.com/auth/signup", profile)
        .then((user) => {
          console.log(user.data)
          localStorage.setItem("Token", JSON.stringify(user.data.token));
          dispatch(AuthDetail(user.data.user))
          toast({description:"Signup Successfully",position:'top',status:'success',duration:'3000'});
          setProfile(init);
          navigate("/")
        })
        .catch((err) => {
          toast({description:"account alredy exit",position:'top',status:'warning'})
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const error = {};
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.userName) {
      error.userName = "Name is required !";
    } else if (values.userName.length < 3) {
      error.userName = "Name must be more then 3 character !";
    } else if (values.userName.length > 10) {
      error.userName = "Name cannot exceed more then 10 character !";
    }

    if (!values.phoneNumber) {
      error.phoneNumber = "Number is required !";
    } else if (
      values.phoneNumber.length < 10 ||
      values.phoneNumber.length > 10
    ) {
      error.number = "Mobile number must be 10 digit ! ";
    }

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
  return (
    <>
      <Link
        onClick={onOpen}
        _hover={{ color: "blue", textDecoration: "underline" }}
      >
        New user? create an account
      </Link>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Create your account</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit} id="form">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Enter name"
                  name="userName"
                  value={profile.userName}
                  onChange={handleChange}
                />
                {formErrors.userName && (
                  <Text color="red.400">{formErrors.userName}</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email ID</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email-id"
                  name="email"
                  onChange={handleChange}
                  value={profile.email}
                />
                {formErrors.email && (
                  <Text color="red.400">{formErrors.email}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Enter phone Number"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                />
                {formErrors.phoneNumber && (
                  <Text color="red.400">{formErrors.phoneNumber}</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <Text color="red.400">{formErrors.password}</Text>
                )}
              </FormControl>
            </form>
            <HStack justifyContent="center">
              <Button
                colorScheme="red"
                mr={3}
                type="submit"
                form="form"
                my={3}
                fontWeight="200"
              >
                Submit
              </Button>
            </HStack>
            <HStack>
              <Divider />
              <Text as="b">or</Text>
              <Divider />
            </HStack>
            <HStack justifyContent="center">
              <Button shadow="xl" gap={3} mt="3" onClick={googleAuth}>
                <FcGoogle />
                <Text fontWeight={200}> Sign in with Google</Text>
              </Button>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              <BiArrowBack />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Signup;
