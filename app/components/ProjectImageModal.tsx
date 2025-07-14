"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectImageModalProps {
  images: string[];
  title: string;
}

const ProjectImageModal: React.FC<ProjectImageModalProps> = ({
  images,
  title,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Screenshot grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        role="list"
        aria-label={`Screenshots of ${title} project`}
      >
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => openModal(imgSrc)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(imgSrc);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View enlarged screenshot ${index + 1} of ${title}`}
          >
            <Image
              src={imgSrc}
              alt={`${title} screenshot ${
                index + 1
              } - shows the user interface and key features of the application`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
              priority
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeModal();
            }
          }}
          tabIndex={-1}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title" className="sr-only">
              Enlarged view of {title} screenshot
            </h2>
            <Image
              src={selectedImage}
              alt={`Enlarged view of ${title} screenshot showing detailed application interface`}
              width={1200}
              height={800}
              className="rounded shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-2 shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close enlarged screenshot view"
              autoFocus
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImageModal;
