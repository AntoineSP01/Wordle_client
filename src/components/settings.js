import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_BACKEND_URL;


function Profile() {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); 
        } else {
            axios
                .get(`${apiUrl}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": process.env.REACT_URL,
                        "Access-Control-Allow-Methods": "POST, GET, PUT",
                    },
                })
                .then((response) => {
                    setName(response.data.name);
                })
                .catch(() => {
                    setMessage("Error loading profile.");
                });
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        axios
            .put(
                `${apiUrl}/api/profile`,
                { name: newName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": process.env.REACT_URL,
                        "Access-Control-Allow-Methods": "POST, GET, PUT",
                    },
                }
            )
            .then(() => {
                setName(newName);
                setMessage("Profile updated successfully!");
            })
            .catch(() => {
                setMessage("Error updating profile.");
            });
    };

    return (
        <div className="container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Current Name"
                    value={name}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="New Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                />
                <button type="submit">Update Name</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Profile;
