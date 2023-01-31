import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function ForgetPasswordModal() {
  const navigate=useNavigate()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formErrors, setFormErrors] = useState({});
  const [issubmit, setIsSubmit] = useState(false);
  const [emailverify, setEmailVerify] = useState(false);
  const emailref = useRef();


  const handleClick = () => {
    setFormErrors(validate(emailref.current.value));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const error = {};
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values) {
      error.email = "Email ID is required !";
    } else if (!regex.test(values)) {
      error.email = "This is not a valid email formate !";
    }

    return error;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && issubmit) {
      const data = {
        email: emailref.current.value,
      };
      setEmailVerify(true);
      setTimeout(() => {
        axios
          .post("http://localhost:5000/user/send_email", data)
          .then((result) => {
            setEmailVerify(false);
            console.log(result.data)
            toast({
              description: "email Verified",
              status: "success",
              position: "top",
            });
            navigate(`/user/change_password/${result.data.content.email}`)
            
            // setOtpForm(false);
            
          })
          .catch((err) => {
            console.log(err);
            setEmailVerify(false);
            toast({
              description: "No user Account",
              status: "error",
              position: "top",
            });
          });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);


  return (
    <>
      <Text
        _hover={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={onOpen}
      >
        Forget password ?
      </Text>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={30}>Forget Your Password ?</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {otpform ? ( */}
              <>
                <Text fontWeight="200" textAlign={"center"} mb={4}>
                  you'll get an OTP on your email{" "}
                </Text>
                <Input
                  type="email"
                  placeholder="Please enter a valid email"
                  mb="5"
                  ref={emailref}
                />
                {formErrors.email && (
                  <Text color="red" mt={-3} mb="3">
                    {formErrors.email}
                  </Text>
                )}
                <Button
                  colorScheme="blue"
                  display="flex"
                  m="auto"
                  mb={5}
                  onClick={handleClick}
                >
                  {emailverify ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="md"
                    />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={onClose}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
