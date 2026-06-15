import React from 'react';
import '../styles/ImageModal.css';
import useEscapeKey from '../hooks/useEscapeKey';

function ImageModal({ imageUrl, onClose }) {
  useEscapeKey(onClose, !!imageUrl);

  if (!imageUrl) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del proyecto"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Vista ampliada del proyecto" className="modal-image" />
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar imagen"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default ImageModal;
