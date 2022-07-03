import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Login from './Login'
import Register from './Register';
import Dashboard from './Dashboard';
import Cart from './Cart';
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
      </BrowserRouter>
        </ChakraProvider>
  );
}

export default App;
