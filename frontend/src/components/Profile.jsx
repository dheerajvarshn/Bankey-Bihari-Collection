import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAuth } from "../Action/Auth";
import { clearCart } from "../Action";
import { HiOutlineMoon } from "react-icons/hi";
import { MdLightMode } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

function Profile() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer.Auth);

  const logout = () => {
    dispatch(DeleteAuth());
    dispatch(clearCart());
    localStorage.removeItem("Token");
  };
  return (
    <Box>
      <Menu>
        <MenuButton
          transition="all 0.2s"
          _hover={{ bg: "green.400" }}
          _focus={{ boxShadow: "outline" }}
          mr="5"
          bgColor="green.100"
          width="30px"
          h={8}
          mt="2"
          pt={1}
          borderRadius="100%"
          textAlign="center"
          fontFamily="sans-serif"
        >
          {auth.userName.slice(0, 1)}
        </MenuButton>
        <MenuList>
          <MenuItem
          //  onClick={()=>navigate('/user/order')}
          >
            Orders
          </MenuItem>
          <MenuDivider />

          <MenuItem
            display={{ base: "block", lg: "none" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MdLightMode /> : <HiOutlineMoon />}
          </MenuItem>
          <MenuDivider />

          <MenuItem onClick={logout}>Log Out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Profile;
