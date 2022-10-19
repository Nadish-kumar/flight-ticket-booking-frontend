import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../src/Pages/Login/Login"
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Booking from './Pages/Booking/Booking';


function App() {
  return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/home" element={<Home />} />
  <Route path="/book/:flightid" element={<Booking />} />
    
  </Routes>
  </BrowserRouter>
  
  );
}

export default App;
