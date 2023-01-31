import { Stack } from "@chakra-ui/react";
import Routers from "./AllRouters/Routers";
import Header from "./components/header";
import CartProduct from "./UserCart/CartProduct";


function App() {
  return (
      <Stack >
      <Header />
      <CartProduct />
      <Routers />
      </Stack>
  );
}

export default App;
