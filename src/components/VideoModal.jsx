import React from 'react';
import '../styles/VideoModal.css';

function VideoModal({ videoUrl, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>&times;</button>
        <video controls autoPlay className="video-player">
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
      </div>
    </div>
  );
}

export default VideoModal;