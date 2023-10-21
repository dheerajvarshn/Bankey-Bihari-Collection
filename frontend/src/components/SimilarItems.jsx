import { Box, Grid, GridItem, Heading, Icon, Image, Skeleton } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ResultNotFound from './resultNotFound';
import { BiRupee } from 'react-icons/bi';
import { FcRating } from 'react-icons/fc';
import Pagination from './Pagination';
import { Link, useParams } from 'react-router-dom';

function SimilarItems({product}) {
  const {_id} = useParams()
  const [similarProducts,setSimilarProducts]=useState([])
  const [isLoaded,setIsLoaded] =useState(true)
  const {category,subcategory} = product
  const [page, setPage] = useState("");

  useEffect(()=>{
    window.scrollTo(0,0)
  },[_id])
  useEffect(() => {
    setIsLoaded(false)
    axios
    .get(`http://localhost:5000/product/category/${category}/${subcategory}`)
      .then((result) => {
        setIsLoaded(true)
        setSimilarProducts(result.data);
      })
      .catch((err) => {
        setIsLoaded(true)
        console.log(err);
      });
  }, [category,subcategory]);
  console.log(similarProducts)


  const productPerPage = (p) => {
    setPage(p);
  };
  return (
    <Box m={'2'} boxShadow={'2xl'} borderRadius={15} p={5}>
       { 
       similarProducts.length !==0 ?<>
             <Box  fontFamily={'sans-serif'} fontWeight={'400'} fontSize={25} ml={10}>
        You might be interested in
      </Box>
      <Box>
      <Grid
            templateColumns="repeat(4, 1fr)"
            gap={2}
            mx="30px"
            padding={3}
            textAlign="center"
            gridRowGap="20px"
            // bg="gray.50"
          >
            {similarProducts.slice(page * 4 - 4, page * 4).map((product) => (
              <Skeleton height="100%" isLoaded={isLoaded}>
                <Link to={`/product/category/subcategory/${product._id}`}>
                  <GridItem
                    textAlign={"center"}
                    key={product._id}
                    mb={2}
                    border="1px"
                    borderStyle="revert"
                    boxShadow="2xl"
                    p="6"
                    rounded="xl"
                    height="90%"
                    w="90%"
                  >
                    <Box key={product._id}>
                      <Image
                        boxSize="150px"
                        src={product.image}
                        alt="Dan Abramov"
                        m="auto"
                        mb={5}
                        objectFit={"cover"}
                      />
                      <Heading fontSize={"20px"}>{`${product.name.substr(
                        0,
                        30
                      )}`}</Heading>
                      <Box>
                        <Icon as={BiRupee} boxSize={3} />
                        {product.price}.<span>00</span>
                      </Box>
                      <Box>
                        {" "}
                        <Icon as={FcRating} boxSize={4} ml="-5" />{" "}
                        {product.rating}
                      </Box>
                    </Box>
                  </GridItem>
                </Link>
              </Skeleton>
            ))}
          </Grid>
          <Pagination products={similarProducts} productPerPage={productPerPage} />
      </Box>
       </> : <ResultNotFound />

       }

    </Box>
  )
}

export default SimilarItems
