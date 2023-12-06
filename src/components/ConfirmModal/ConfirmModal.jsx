import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}

export default ConfirmModal;
