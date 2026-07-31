import React, { useState } from 'react';

const ImageZoom = ({ images = [] }) => {
  const imageList = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, isHovered: true });
  };

  return (
    <div className="space-y-4">
      {/* Main Magnifier View */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomPos((prev) => ({ ...prev, isHovered: false }))}
        className="relative aspect-square w-full rounded-3xl overflow-hidden glass-panel bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 cursor-crosshair group shadow-lg"
      >
        <img
          src={selectedImage}
          alt="Product Showcase"
          className={`w-full h-full object-cover object-center transition-transform duration-200 ${
            zoomPos.isHovered ? 'scale-150' : 'scale-100'
          }`}
          style={
            zoomPos.isHovered
              ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
              : undefined
          }
        />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity">
          Hover to Zoom
        </div>
      </div>

      {/* Thumbnail Bar */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedImage === img
                  ? 'border-primary-600 shadow-glow scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
