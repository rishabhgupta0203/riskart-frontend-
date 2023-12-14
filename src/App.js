import Navbar from './navbar/Navbar'; // Import the Navbar component
import MyRoutes  from './Router';
import React,{ useState, createContext, useContext, useEffect, useRef } from "react";

export const ThemeContext = createContext(null);

function App() {
  const[searched,setsearched]=useState("");



  const contextValue = {
    searched,
    setsearched,
  };
  
  return (
    <>
        <ThemeContext.Provider value={contextValue}>

    <Navbar />
     <MyRoutes />
     </ThemeContext.Provider>
    </>
  );
}

export default App;
