import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialisation du hook useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                "https://wordleserver-antoines-projects-bf7851c2.vercel.app/api/register",
                {
                    name,
                    email,
                    password,
                }
            )
            .then((response) => {
                setMessage("Registration successful!");
                const token = response.data.token; // Récupérer le token depuis la réponse
                localStorage.setItem("token", token); // Stocker le token réel
                localStorage.setItem("username", name); // Stocker le nom de l'utilisateur
                navigate("/game"); // Redirection vers la page du jeu
                window.location.reload();
            })
            .catch((error) => setMessage("Error registering user."));


        // Réinitialiser les champs de saisie après soumission
        setPassword("");
        setEmail("");
        setName("");
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
