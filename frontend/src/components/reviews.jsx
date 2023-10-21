import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import ReviewModal from "./Modal/ReviewModal";
import { useSelector } from "react-redux";

function Reviews({ product }) {
  const auth = useSelector((state) => state.authReducer.Auth);
  const [allReviews, setAllReviews] = useState(false);
  const [reviews, setReviews] = useState({});
  const [showReviews, setShowReviews] = useState([]);

  console.log(product);
  useEffect(() => {
    if (product) {
      setReviews({ ...reviews, productId: product._id });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() =>{
 try{
  if(Object.keys(auth).length!==0){
    setReviews({ ...reviews, userId: auth._id });
  }
 }catch(err){
    console.log({'Error':err})
 }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])



  // get Reviews
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/product/${product._id}`)
      .then((result) => {
        setShowReviews(result.data.data);
      })
      .catch((error) => {
        console.log({ error: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reviewFunction = (data) => {
    console.log(data);
    setReviews({ ...reviews, reviewText: data.review, rating: data.rating });
    console.log(reviews);
  };

  // add Reviews
  useEffect(() => {
    // setReviews({...reviews,productId:product._id})
    if (
      reviews.userId &&
      reviews.productId &&
      reviews.rating &&
      reviews.reviewText
    ) {
      axios
        .post("http://localhost:5000/reviews/product/add", reviews)
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => {
          console.log({ error: error });
        });
    }
  }, [reviews]);
  console.log(showReviews);

  // showa all reviews
  const showBrand = () => {
    setAllReviews(!allReviews);
    window.scrollTo(50, 50);
  };
  console.log(showReviews)
  const visibleItem = allReviews ? showReviews : showReviews.slice(0, 3);

  return (
    <Box
      borderY={"1px"}
      marginTop={"5"}
      borderColor={"gray.200"}
      p="5"
      bg="white"
    >
      <Flex>
        <Heading size={"md"}>Product Ratings & Review</Heading>
        <Spacer />
        <Box>
          <ReviewModal reviewFunction={reviewFunction} />
        </Box>
      </Flex>
      {showReviews.length !== 0 && (
        <>
          {visibleItem.map((data, index) => (
            <Box>
              <Box borderTop={"1px"} marginY={"5px"} borderColor={"gray.200"}>
                <Box display={"flex"} gap={2} mt={3}>
                  <Box
                    color={"gray.500"}
                    fontSize={"20px"}
                    fontFamily={"monospace"}
                  >
                    {data.userName}
                  </Box>
                  <Divider
                    color={"gray.300"}
                    h={"20px"}
                    mt={1}
                    orientation="vertical"
                  />
                  <Box color={"gray.500"} mt={1}>
                    {data.createdAt.slice(0,10)}
                  </Box>
                </Box>

                <Box
                  my={2}
                  color={"white"}
                  backgroundColor={"teal.500"}
                  justifyContent={"center"}
                  display={"flex"}
                  width={"4rem"}
                  height={"20px"}
                  borderRadius={"10px"}
                >
                  {data.rating + 0.0}
                  <>
                    <AiFillStar />
                  </>
                </Box>
                <Box my={3}>{data.reviewText}</Box>
              </Box>
            </Box>
          ))}

      <Button onClick={showBrand} colorScheme='teal' variant='outline' ml={'10'}>
        {allReviews ? "Show Less" : "Show More"}
      </Button>
        </>
      )}
    </Box>
  );
}

export default Reviews;
