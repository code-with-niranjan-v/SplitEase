import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

export default function AppRoutes(){
    return <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home/>} />
             <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
}