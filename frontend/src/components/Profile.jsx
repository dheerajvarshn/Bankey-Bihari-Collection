import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAuth } from '../Action/Auth';
import { clearCart } from '../Action';

function Profile() {
    const dispatch=useDispatch()
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
    transition='all 0.2s'
    _hover={{ bg: 'green.400' }}
    _focus={{ boxShadow: 'outline' }}
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
    <MenuItem>Orders</MenuItem>
    <MenuDivider />
   
    <MenuItem onClick={logout}>Log Out</MenuItem>
  </MenuList>
</Menu>
    </Box>
  )
}

export default Profile
