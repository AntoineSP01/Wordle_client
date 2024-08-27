import React, { useState } from "react";
import Navbar from "./components/navBar"; // Importer le composant Navbar
import { Outlet } from "react-router-dom"; 
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

     const handleLogin = () => {
         setIsAuthenticated(true);
     };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <>
            <Navbar
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
            <Outlet context={{ handleLogin }} />
        </>
    );
}

export default App;
