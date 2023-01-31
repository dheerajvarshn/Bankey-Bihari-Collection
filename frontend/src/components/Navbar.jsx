import {
  Box,
  Flex,
  Spacer,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const menCategory = [
  {
    name: "T-Shirts",
    to: "/product/category/Men/t-shirt",
  },
  {
    name: "Shirts",
    to: "/product/category/Men/shirts",
  },
  {
    name: "Trouser",
    to: "/product/category/Men/trouser",
  },
  {
    name: "Jeans",
    to: "/product/category/Men/jeans",
  },
  {
    name: "Ethinic Wear",
    to: "/product/category/Men/ethinic wear",
  },
  {
    name: "Suits & Blazzer",
    to: "/product/category/Men/suits & blazzer",
  },
  {
    name: "Jackets &Coats",
    to: "/product/category/Men/jacket",
  },
];

const womenCategory = [
  {
    name: "Shirts,Tops,Tees",
    to: "/product/category/Women/top",
  },
  {
    name: "Sarees",
    to: "/product/category/Women/sarees",
  },
  {
    name: "Salwar Suits",
    to: "/product/category/Women/salwar & suit",
  },
  {
    name: "Jeans & Jegging",
    to: "/product/category/Women/jeans",
  },
  {
    name: "Kurtas",
    to: "/product/category/Women/kurtas",
  },
  {
    name: "Dresses",
    to: "/product/category/Women/dresses",
  },
];

function Navbar() {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);

      if (e.target.value) {
        const string = e.target.value;
        const findProduct = string.toLowerCase().split(" ");
        console.log(findProduct);
        axios
          .post("http://localhost:5000/search", null, {
            params: `${findProduct}`,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <Flex
      minWidth="max-content"
      pl="5%"
      pr="5%"
      alignItems="center"
      gap="2"
      mb={"10px"}
    >
      <IconButton aria-label="Search database" icon={<SearchIcon />} />
      <Input
        type={"text"}
        placeholder="Search mens,womens,kids latest clothes"
        borderColor="red.200"
        onKeyDown={handleKeyDown}
      />
      <Box p="2">
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Mens
          </MenuButton>
          <MenuList>
            {menCategory.map((item) => (
              <Link to={item.to}>
                {" "}
                <MenuItem key={item.name}>{item.name}</MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Womens
          </MenuButton>
          <MenuList>
            {womenCategory.map((item) => (
              <Link to={item.to}>
                {" "}
                <MenuItem key={item.name}>{item.name}</MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Boys Kids
          </MenuButton>
          <MenuList>
            <Link to="/product/category/Boys/t-shirt">
              <MenuItem key="T-Shirts">T-Shirts</MenuItem>
            </Link>
            <Link to="/product/category/Boys/shirts">
              <MenuItem key="Shirts">Shirts</MenuItem>
            </Link>
            <Link to="/product/category/Boys/jeans">
              <MenuItem key="Jeans">Jeans</MenuItem>
            </Link>
            <Link to="/product/category/Boys/pants">
              <MenuItem key="Pants">Pants</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Girls Kids
          </MenuButton>
          <MenuList>
            <Link to="/product/category/Girls/top">
              <MenuItem key="Top &Tees">Top & Tees</MenuItem>
            </Link>
            <Link to="/product/category/Girls/dresses">
              <MenuItem key="Dresses">Dresses</MenuItem>
            </Link>
            <Link to="/product/category/Girls/jeans">
              <MenuItem key="Jeans">Jeans</MenuItem>
            </Link>
            <Link to="/product/category/Girls/pants">
              <MenuItem key="Pants">Pants</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Navbar;
