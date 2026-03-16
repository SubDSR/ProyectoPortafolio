import React from 'react';
import '../styles/VideoModal.css';

function VideoModal({ videoUrl, isOpen, onClose }) {
  if (!isOpen) return null;

  const getEmbedUrl = (url) => {
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    return url;
  };

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Se ha eliminado el botón de la "X" aquí */}
        <iframe
          src={getEmbedUrl(videoUrl)}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Preview"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}

export default VideoModal;