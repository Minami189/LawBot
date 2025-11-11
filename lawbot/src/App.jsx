import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import Landing from './Components/Landing.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Register from './Components/Register.jsx';
import Logs from "./Components/Logs.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route index element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/logs" element={<Logs/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App
