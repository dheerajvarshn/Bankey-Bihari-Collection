import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import theme from "./components/colorMode/ColorMode";
import fonts from './theme'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ChakraProvider theme={fonts}>
      <BrowserRouter>
      <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Provider >
      </BrowserRouter>
    </ChakraProvider>
);

reportWebVitals();
