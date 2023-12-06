import React from 'react';
import './WinnerPopup.css';

function WinnerPopup({ winner, onReset }) {
    return (
        <div className="winner-popup-overlay">
            <div className="winner-popup">
                <h2>Game Over</h2>
                <p className="winner-message">Winner is: {winner}</p>
                <button onClick={onReset}>Play Again</button>
            </div>
        </div>
    );
}

export default WinnerPopup;
