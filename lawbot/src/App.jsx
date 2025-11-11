import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import Landing from './Components/Landing.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route index element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App
