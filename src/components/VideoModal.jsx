import React from 'react';
import '../styles/VideoModal.css';
import useEscapeKey from '../hooks/useEscapeKey';

function VideoModal({ videoUrl, isOpen, onClose }) {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;

  const getEmbedUrl = (url) => {
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    return url;
  };

  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video del proyecto"
    >
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Cerrar video"
        >
          &times;
        </button>
        <iframe
          src={getEmbedUrl(videoUrl)}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Preview"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

export default VideoModal;
