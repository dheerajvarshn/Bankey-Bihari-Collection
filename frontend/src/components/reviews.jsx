import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Heading, Spacer, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import ReviewModal from "./Modal/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { AuthDetail } from "../Action/Auth";

function Reviews({ product }) {
  const toast = useToast()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authReducer.Auth);
  const [allReviews, setAllReviews] = useState(false);
  const [reviews, setReviews] = useState({});
  const [add,setAdd]=useState(false)
  const [showReviews, setShowReviews] = useState([]);

  useEffect(() => {
    if (product) {
      setReviews({ ...reviews, productId: product._id });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(()=>{
    dispatch(AuthDetail())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() =>{
 try{
  console.log(auth)
  if(Object.keys(auth).length!==0){
    setReviews({ ...reviews, userId: auth._id });
    setAdd(true)
  }else{
    setAdd(false)
  }
 }catch(err){
    console.log({'Error':err})
 }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[add])



  // get Reviews
  useEffect(() => {
    console.log(product._id)
    axios
      .get(`https://mern-zvtq.onrender.com/reviews/product/${product._id}`)
      .then((result) => {
        console.log(result)
        setShowReviews(result.data.data);
      })
      .catch((error) => {
        console.log({ error: error });
      });

  }, [product._id,reviews]);

  const reviewFunction = (data) => {
    setReviews({ ...reviews, reviewText: data.review, rating: data.rating });
  };

  // add Reviews
  useEffect(() => {
    if (
      reviews.userId &&
      reviews.productId &&
      reviews.rating &&
      reviews.reviewText
    ) {
      console.log(reviews)
      axios
        .post("https://mern-zvtq.onrender.com/reviews/product/add", reviews)
        .then((result) => {
          toast({description:"review add",position:'top',status:'success',duration:'3000'})
        })
        .catch((error) => {
          console.log({ error: error });
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  // showa all reviews
  const showBrand = () => {
    setAllReviews(!allReviews);
    window.scrollTo(50, 50);
  };
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
          <ReviewModal reviewFunction={reviewFunction} show={add} />
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
