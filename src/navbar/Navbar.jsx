import React, {  useEffect, useState ,useContext} from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ThemeContext } from "../App"; // Import the ThemeContext
import './navbar.css';
function Navbar() {
  const navigate = useNavigate(); 
  const {searched,setsearched} = useContext(ThemeContext);

  const [isLoggedIn,setlog]=useState(localStorage.getItem("user")!==null);
  // const[searched,setsearched]=useState("");
  const [searching,setsearching]=useState("");
useEffect(()=>{
  if (localStorage.length !== 0) {
    console.log("hkjjkh")
  setlog(true);
 
 }
 else
 {
  setlog(false);
 }

},[localStorage.getItem("user")]);

// useEffect(()=>{console.log(searched);
//   if(searched!=="")
//   {

//         navigate('/searchedproduct', { state: { search: searched } });

//       }} ,[searched]);

const handleclick=()=>{

   setsearched(searching);
       navigate('/');


}
const handleLogOut=()=>{
  
  localStorage.clear();
  setlog(false)
  navigate("/login");
}
const handleLogIn=()=>{

  navigate("/login");
 
 
}


const goToKart=()=>{
  if (localStorage.length === 0) {
    navigate("/login");

  } else {
    navigate("/kart");

  }
};
const goToorder=()=>{
  if (localStorage.length === 0) {
    navigate("/login");

  } else {
    navigate("/order");

  }
};
const goToprofile=()=>{
  if (localStorage.length === 0) {
    navigate("/login");

  } else {
    navigate("/profile");

  }
};

  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top navcolour">
  <div className="container-fluid ">
    <a className="navbar-brand text-primary" href="/">Riskart</a>
    <button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button className="nav-link active navbutton "  aria-current="page" onClick={goToprofile}>Profile</button>
        </li>
        <li className="nav-item">
          <button className="nav-link active navbutton" aria-current="page" onClick={goToorder}>Order</button>
        </li>
        
          
       
      </ul>
      <div className="d-flex" role="search">
        <input className="form-control me-2" type="search" value={searching} onChange={(e)=>{setsearching(e.target.value)}}/>
        <button className="btn btn-outline-primary "  onClick={handleclick}>Search</button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex justify-content-center align-items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/12598/12598856.png" onClick={goToKart} className="py-0 px-0 mx-1 ml-2  nav-link active " aria-current="page"></img>
        </li>
       
      {!isLoggedIn?
        <li className="nav-item">
   <a className="nav-link active " aria-current="page" onClick={handleLogIn} href="">Login</a></li>
        :
        <li className="nav-item">
   <a className="nav-link active " aria-current="page" onClick={handleLogOut} href="">Logout</a></li>
        
        }
      </ul>
        </div>
    </div>
  </div>
</nav>

    </>
  );
}

export default Navbar;
