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
    Input
  } from "@chakra-ui/react";
  import axios from "axios";
  import React from "react";
  import { useState } from "react";
  
  const init = {
    name:"",
    category:"",
    brand:"",
    image:"",
    description:"",
    quantity:"",
    price:"",
    reviews:"",
    rating:"",
  };
  
  function AddProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure();
      const [product,setProduct] = useState(init);
  
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({
        ...product,
        [name]: value,
      });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('https://mern-zvtq.onrender.com/product/add',product).then((result)=>{
          console.log(result.data)
      }).catch((err)=>{
          console.log(err)
      })
      alert('Add Product')
      onClose()
    };
  
    return (
      <>
          <Button colorScheme="teal" mr={4} h="30px" pb={2} onClick={onOpen} mt='10px'>
            Add Product
          </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit} id='my-form'>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input ref={initialRef} placeholder="Enter name" name="name" value={product.name} onChange={handleChange} />
              </FormControl>
  
              <FormControl mt={4} isRequired>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  placeholder="Category"
                  name="category"
                  onChange={handleChange}
                   value={product.category}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Brand</FormLabel>
                <Input
                  type="text"
                  placeholder="brand"
                  name="brand"
                  onChange={handleChange}
                   value={product.brand}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Image</FormLabel>
                <Input placeholder="product image" type="text" name="image" value={product.image} onChange={handleChange}/>
              </FormControl>
  
              <FormControl mt={4} isRequired>
                <FormLabel>Description</FormLabel>
                <Input placeholder="description" name="description" value={product.description} onChange={handleChange} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Rating</FormLabel>
                <Input placeholder="rating" name="rating" value={product.rating} onChange={handleChange} type='number' />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Reviews</FormLabel>
                <Input placeholder="reviews" name="reviews" value={product.reviews} onChange={handleChange} type='number'/>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input placeholder="quantity" name="quantity" value={product.quantity} onChange={handleChange} />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Price</FormLabel>
                <Input placeholder="price" name="price" value={product.price} onChange={handleChange} />
              </FormControl>
  
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type='submit' form='my-form'>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default AddProduct
