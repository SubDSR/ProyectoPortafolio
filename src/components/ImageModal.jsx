import React from 'react';
import '../styles/ImageModal.css';

function ImageModal({ imageUrl, onClose }) {
  // Si no hay URL de imagen, no renderizamos nada.
  if (!imageUrl) {
    return null;
  }

  // Usamos e.stopPropagation() para que al hacer clic en la imagen,
  // no se cierre el modal (ya que el clic se propagaría al fondo).
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Vista ampliada del proyecto" className="modal-image" />
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

export default ImageModal;