import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { FcRating } from "react-icons/fc";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import FilterPage from "./Filter/filterpage";
import { useState } from "react";
import Pagination from "./Pagination";
import ResultNotFound from "./resultNotFound";

function CommonProductPage({ products, isLoaded }) {
  const [page, setPage] = useState("");

  const productPerPage = (p) => {
    setPage(p);
  };
  return (
    <Box
      display={"flex"}
      m={3}
      p={"2"}
      border={"1px"}
      borderColor={"gray.200"}
      justifyContent={"space-between"}
    >
      <Box w={"15rem"} borderRight={"1px"} borderColor={"gray.200"} mr={"5"}>
        <FilterPage products={products} />
      </Box>
      {products.length !== 0 ? (
        <Box w={"80%"}>
          <Heading
            fontSize={25}
            // bg="gainsboro"
            width="50%"
            fontStyle="italic"
            ml={12}
            pl={5}
          >
            TOP TREANDING PRODUCTS
          </Heading>
          <Divider mt={"5"} color={"blackAlpha.200"} />
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={2}
            mx="30px"
            padding={5}
            textAlign="center"
            gridRowGap="20px"
            // bg="gray.50"
          >
            {products.slice(page * 8 - 8, page * 8).map((product) => (
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
          <Pagination products={products} productPerPage={productPerPage} />
        </Box>
      ) : (
        <ResultNotFound />
      )}
    </Box>
  );
}

export default CommonProductPage;
