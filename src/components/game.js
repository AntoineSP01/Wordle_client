import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function Game() {
    const [word, setWord] = useState(""); 
    const [guess, setGuess] = useState(""); 
    const [attempts, setAttempts] = useState([]); 
    const [gameOver, setGameOver] = useState(false); 
    const [hasWon, setHasWon] = useState(false); 
    const maxAttempts = 6; 
    const username = localStorage.getItem("username"); 

    useEffect(() => {
        fetchWord();
    }, []);

    const fetchWord = () => {
        axios
            .get(`${apiUrl}/api/word`, {
                headers: {
                    "Access-Control-Allow-Origin": process.env.REACT_URL,
                    "Access-Control-Allow-Methods": "POST, GET, PUT",
                },
            })
            .then((response) => setWord(response.data))
            .catch((error) => console.error("Error fetching word:", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (guess.length !== 5) return; 

        axios
            .post(
                `${apiUrl}/api/guess`,
                { guess, word },
                {
                    headers: {
                        "Access-Control-Allow-Origin": process.env.REACT_URL,
                        "Access-Control-Allow-Methods": "POST, GET, PUT",
                    },
                }
            )
            .then((response) => {
                const feedback = response.data.feedback;

                
                setAttempts([...attempts, { guess, feedback }]);

                if (guess === word) {
                    setHasWon(true); 
                    setGameOver(true); 
                } else if (attempts.length + 1 === maxAttempts) {
                    setGameOver(true); 
                }

                
                setGuess("");
            })
            .catch((error) => console.error("Error submitting guess:", error));
    };

    const handleRestart = () => {
        setAttempts([]);
        setGuess("");
        setGameOver(false);
        setHasWon(false);
        fetchWord();
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Wordle Clone</h1>
                <h2>Welcome to the Game, {username}!</h2>
                {!gameOver ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            maxLength={5}
                            disabled={gameOver}
                        />
                        <button type="submit" disabled={gameOver}>
                            Submit
                        </button>
                    </form>
                ) : (
                    <div>
                        <h2>
                            {hasWon
                                ? "Congratulations! You found the word!"
                                : "Game Over! The word was: " + word}
                        </h2>
                        <button
                            className="restart-button"
                            onClick={handleRestart}
                        >
                            Restart
                        </button>
                    </div>
                )}

                <div className="attempts">
                    {attempts.map((attempt, index) => (
                        <div key={index} className="attempt">
                            {attempt.feedback.map((color, i) => (
                                <span key={i} className={color}>
                                    {attempt.guess[i]}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Game;
