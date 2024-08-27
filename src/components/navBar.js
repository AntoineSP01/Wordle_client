import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


function Navbar({ isAuthenticated, handleLogout }) {
    
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/game">Play Game</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/settings">Settings</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
