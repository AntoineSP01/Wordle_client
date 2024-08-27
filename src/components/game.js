import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Game() {
    const [word, setWord] = useState(""); // Le mot à deviner
    const [guess, setGuess] = useState(""); // La tentative actuelle
    const [attempts, setAttempts] = useState([]); // Tableau des tentatives
    const [gameOver, setGameOver] = useState(false); // Pour gérer la fin de la partie
    const [hasWon, setHasWon] = useState(false); // Pour gérer la victoire
    const maxAttempts = 6; // Nombre maximum de tentatives
    const username = localStorage.getItem("username"); 

    useEffect(() => {
        fetchWord();
    }, []);

    const fetchWord = () => {
        axios
            .get("http://localhost:5000/api/word")
            .then((response) => setWord(response.data))
            .catch((error) => console.error("Error fetching word:", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (guess.length !== 5) return; // Vérifier que la tentative fait bien 5 caractères

        axios
            .post("http://localhost:5000/api/guess", { guess, word })
            .then((response) => {
                const feedback = response.data.feedback;

                // Ajouter la tentative et le feedback au tableau des tentatives
                setAttempts([...attempts, { guess, feedback }]);

                if (guess === word) {
                    setHasWon(true); // L'utilisateur a gagné
                    setGameOver(true); // Terminer la partie
                } else if (attempts.length + 1 === maxAttempts) {
                    setGameOver(true); // Terminer la partie si les tentatives sont épuisées
                }

                // Réinitialiser la tentative
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
