import { useState, createContext } from 'react'
import Landing from './Components/Landing/Landing.jsx';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Register from './Components/Register/Register.jsx';
import Logs from "./Components/Logs/Logs.jsx"
import About from './Components/About/About.jsx';
import AuditLog from './Components/AuditLog/AuditLog.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Summarize from './Components/Summarize/Summarize.jsx';
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
          <Route path="/summary" element={<Summarize/>}/>
          <Route path="/auditlog" element={<AuditLog/>}/>
          <Route path="*" element={<Landing/>}/>
        </Routes>
      </BrowserRouter>      
    </AppContext.Provider>

  );
}

export default App
