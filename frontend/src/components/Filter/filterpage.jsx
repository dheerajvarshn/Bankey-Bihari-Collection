import { Box, Divider } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import CategoryFilter from "./categoryFilter";
import BrandFilter from "./brandFilter";
import PriceFilter from "./priceFilter";
import { useDispatch } from "react-redux";
import { filterProduct } from "../../Action/Filter";

const FilterPage = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    category: "",
    brand: [],
    price: { min: "", max: "" },
  });

  const categoryFilter = (category) => {
    console.log(category)
    if (category) {
      setFilter({ ...filter, category: category });
    }
  };


  const brandFilter = useCallback((brand) => {
      if (brand) {
        setFilter({ ...filter, brand: brand });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const priceFilter = (price) => {
    if (price) {
      setFilter({ ...filter, price: { min: price.min, max: price.max } });
    }
  };

  useEffect(() => {
    console.log(filter);
    if (
      Object.keys(filter.category).length !== 0 ||
      filter.brand.length !== 0 ||
      filter.price.min !== undefined ||
      filter.price.max !== undefined
    ) {
      dispatch(filterProduct(filter));
    }

  }, [dispatch, filter]);

  return (
    <Box maxWidth={"250px"} p={3} bgColor={"red.50"} ml={5}>
      <Box fontWeight={"200"} fontStyle={"bold"} fontSize={"xl"} mb={"2"}>
        Filters
      </Box>
      <Divider my={2} />
      <Box>
        <CategoryFilter category={categoryFilter} />
      </Box>
      <Divider my={2} />
      <Box>
        <BrandFilter brand={brandFilter} />
      </Box>
      <Divider my={2} />
      <Box>
        <PriceFilter price={priceFilter} />
      </Box>
      <Divider mt={"5"} color={"blackAlpha.200"} />
    </Box>
  );
};

export default FilterPage;
