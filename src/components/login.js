import React, { useState } from "react";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_BACKEND_URL;


function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { handleLogin } = useOutletContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                `${apiUrl}/api/login`,
                { email, password },
                {
                    headers: {
                        "Access-Control-Allow-Origin": process.env.REACT_URL,
                    },
                }
            )
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                setMessage("Login successful!");
                handleLogin();
                navigate("/game"); // Redirection vers la page du jeu
                window.location.reload();
            })
            .catch((error) => {
                console.error("Login error:", error); // Loguer l'erreur pour déboguer
                setMessage("Error logging in.");
            });

        setPassword("");
        setEmail("");
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
