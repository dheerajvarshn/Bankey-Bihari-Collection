import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import logo from "../images/1.png";
import { AiOutlineContacts } from "react-icons/ai";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";

const init={
    number:"",
    email:""
}
const Contact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit,setIsSubmit]=useState(false)
  const [contact,setContact]=useState(init)

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  


  const handleChange=(e)=>{
    const {name,value}=e.target
    setContact({
        ...contact,[name]:value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(contact));
    setIsSubmit(true)
  };

    useEffect(()=>{
      if(Object.keys(formErrors).length===0 && isSubmit){
        console.log(contact)
      }
    })

  const validate = (values) => {
    const error = {};
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.email) {
      error.email = "Email ID is required !";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email formate !";
    }

    if (!values.number) {
      error.number = "Number is required !";
    } else if (values.number.length !== 10) {
      error.number = "Number must be 10 digits !";
    }
    return error;
  };
  return (
    <>
        
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack bg="cyan.100" p="2" w="90%">
              <Image
                src={logo}
                alt="logo"
                w="30px"
                h={8}
                borderRadius={"50%"}
              />
              <Box fontFamily="serif">Bankey Bihari Collection</Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="form" onSubmit={handleSubmit}>
              <HStack mb={3}>
                <AiOutlineContacts />
                <Text as="bold">Contact Details</Text>
              </HStack>
              <VStack gap={5}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.300" />}
                  />
                  <Input
                    type="number"
                    placeholder="Phone number"
                    name="number"
                    value={contact.number}
                    onChange={(e)=>handleChange(e)}
                  />
                  {formErrors.number && (
                    <Text color="red">{formErrors.number}</Text>
                  )}
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Email Id"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <Text color="red">{formErrors.email}</Text>
                  )}
                </InputGroup>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" form="form">
              Proceed
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contact;
