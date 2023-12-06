import React, { useState } from 'react';
import Board from './components/Board/Board';
import WinnerPopup from './components/WinnerPopup/WinnerPopup';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import './App.css';

function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerNames, setPlayerNames] = useState({ x: '', o: '' });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClick = (i) => {
        const boardCopy = [...squares];
        if (calculateWinner(boardCopy) || boardCopy[i]) return;
        boardCopy[i] = xIsNext ? 'X' : 'O';
        setSquares(boardCopy);
        setXIsNext(!xIsNext);
    };

    const handleReset = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmReset = (isSamePlayers) => {
        setShowConfirmModal(false);
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        if (!isSamePlayers) {
            setGameStarted(false);
            setPlayerNames({ x: '', o: '' });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setGameStarted(true);
    };


    const winner = calculateWinner(squares);
    const status = `Next player: ${xIsNext ? playerNames.x : playerNames.o}`;

    const handlePlayAgain = () => {
        setShowConfirmModal(true);
    };

    if (!gameStarted) {
        return (
            <form onSubmit={handleSubmit} className="player-name-form">
                <input
                    type="text"
                    placeholder="Player 1 Name"
                    value={playerNames.x}
                    onChange={(e) => setPlayerNames({ ...playerNames, x: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Player 2 Name"
                    value={playerNames.o}
                    onChange={(e) => setPlayerNames({ ...playerNames, o: e.target.value })}
                    required
                />
                <button type="submit">Start Game</button>
            </form>
        );
    }

    return (
        <><div className="game">
            <div className="game-status">{status}</div>
            <Board squares={squares} onClick={handleClick} />
            <button onClick={handleReset}>Reset Game</button>
            {winner && (
                <WinnerPopup
                    winner={winner === 'X' ? playerNames.x : playerNames.o}
                    onReset={handlePlayAgain} />
            )}
            {showConfirmModal && (
                <ConfirmModal
                    message="Are the players the same?"
                    onConfirm={() => handleConfirmReset(true)}
                    onCancel={() => handleConfirmReset(false)} />
            )}
        </div>
        <footer className='footer'>Created by Ivan Draganov</footer></>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default App;

