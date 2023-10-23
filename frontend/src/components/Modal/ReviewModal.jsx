import {
  Box,
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
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const ReviewModal = ({ reviewFunction, show }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    if (rating && review) {
      const data = { rating, review };
      reviewFunction(data);
      onClose();
      toast({
        description: "Review Add successfull",
        status: "success",
        position: "top",
      });
    }
  };
  const notLogin=()=>{
    toast({
      description: "You are not login",
      status: "success",
      position: "top",
    })
  }
  

  return (
    <>
      <Box>
        {show ? (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={onOpen}
          >
            Add Reviews
          </Button>
        ) : (
          <Button
          
            colorScheme="red"
            variant="outline"
            onClick={notLogin}
          >
            Add Reviews
          </Button>
        )}
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize={20}>ADD RATING AND REVIEW</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Text>Review : </Text>
              <Input
                type="text"
                placeholder="Give your feedback"
                mb="5"
                onChange={(e) => setReview(e.target.value)}
              />
              <Text mt={3}>Rating : </Text>
              <RadioGroup defaultValue="5" value={rating} onChange={setRating}>
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="1">
                    1
                  </Radio>
                  <Radio colorScheme="red" value="2">
                    2
                  </Radio>
                  <Radio colorScheme="red" value="3">
                    3
                  </Radio>
                  <Radio colorScheme="red" value="4">
                    4
                  </Radio>
                  <Radio colorScheme="red" value="5">
                    5
                  </Radio>
                </Stack>
              </RadioGroup>
              <Button
                colorScheme="blue"
                display="flex"
                m="auto"
                my={5}
                onClick={handleClick}
              >
                Add
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
};
export default ReviewModal;
