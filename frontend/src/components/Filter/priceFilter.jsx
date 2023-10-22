import {
  Box,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const PriceFilter = ({ price }) => {
  const [filterValue, setFilterValue] = useState({});

  const handleChange = (value) => {
    setFilterValue({ min: value[0], max: value[1] });
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if(name==="min" && value<filterValue.max){
      setFilterValue({ ...filterValue, [name]: Number(value) });
    }else if(name==="max" && value>filterValue.min){
      setFilterValue({ ...filterValue, [name]: Number(value) });
    }else{
      return
    }
  };
  useEffect(() => {
    console.log(filterValue)
    price(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  return (
    <Box>
      <Box my={2}>
        <Heading size={"sm"} fontStyle={"oblique"}>
          Price
        </Heading>
        <Box>
          <RangeSlider
            defaultValue={[filterValue.min ? filterValue.min :0, filterValue.max ? filterValue.max :1000]}
            min={0}
            max={1000}
            step={200}
            onChangeEnd={(val) => handleChange(val)}
          >
            <RangeSliderTrack bg="red.100">
              <RangeSliderFilledTrack bg="red.400" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={3} index={0} />
            <RangeSliderThumb boxSize={3} index={1} />
          </RangeSlider>
        </Box>
        <Box display={"flex"} gap={"10px"} justifyContent={'center'} >
          <Box>
            <Select
              placeholder="min"
              h={5}

              fontSize={10}
              name="min"
              textAlign={"center"}
              value={filterValue.min}
              onChange={handleSelect}

            >
              <option value="200">₹200</option>
              <option value="400">₹400</option>
              <option value="600">₹600</option>
              <option value="800">₹800</option>
              <option value="1000">₹1000</option>
            </Select>
          </Box>
          <Box>to</Box>
          <Box>
            <Select
              placeholder="₹ 1000"
              h={5}
              name="max"
              value={filterValue.max}
              fontSize={10}
              textAlign={"center"}
              onChange={handleSelect}
            >
              <option value="200">₹200</option>
              <option value="400">₹400</option>
              <option value="600">₹600</option>
              <option value="800">₹800</option>
              <option value="1000">₹1000+</option>
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceFilter;
