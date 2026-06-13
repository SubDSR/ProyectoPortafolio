import React, { useEffect } from 'react';
import '../styles/ImageModal.css';

function ImageModal({ imageUrl, onClose }) {
  useEffect(() => {
    if (!imageUrl) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [imageUrl, onClose]);

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
