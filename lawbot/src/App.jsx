import { useState, createContext } from 'react'
import Navbar from './Components/Navbar.jsx'
import Landing from './Components/Landing.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Register from './Components/Register.jsx';
import Logs from "./Components/Logs.jsx"
import About from './Components/About.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//para makuha sa ibang pages sino logged user
//seperado pa toh sa localStorage since para sa remembered users lang yon
//eto naman para pag di niremember
export const AppContext = createContext(null);


function App() {
  const [userToken, setUserToken] = useState();
  const baseName = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '') || '/';

  return (
    <AppContext.Provider value={{userToken, setUserToken}}>
      <BrowserRouter basename={baseName}>
        <Routes>
          <Route index element={<Landing/>}/>
          <Route path="/index.html" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/logs" element={<Logs/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<Landing/>}/>
        </Routes>
      </BrowserRouter>      
    </AppContext.Provider>

  );
}

export default App
