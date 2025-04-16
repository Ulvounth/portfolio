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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => openModal(imgSrc)}
          >
            <Image
              src={imgSrc}
              alt={`${title} screenshot ${index + 1}`}
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
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt={`${title} enlarged screenshot`}
              width={1200}
              height={800}
              className="rounded shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-2 shadow hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
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
