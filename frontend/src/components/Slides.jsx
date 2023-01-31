import { Box} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slidesImages from "./Images";

console.log(slidesImages);

const Slides = () => {
  return (
    <Box position={'relative'}>
      <Carousel
        autoPlay={true}
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        height='200px'
      >
        {slidesImages.map((image) => (
          <Box height={500} backgroundSize='cover'>
            <img src={image} alt="sorry" />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slides;
