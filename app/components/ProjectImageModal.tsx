"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Dialog from "./Dialog";

export default function ProjectImageModal({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        aria-label={`Screenshots of ${title} project`}
      >
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              className="relative block w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg"
              onClick={() => {
                setSelectedImage(src);
                dialogRef.current?.showModal();
              }}
              aria-label={`View enlarged screenshot ${index + 1} of ${title}`}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </button>
          </li>
        ))}
      </ul>
      <Dialog
        dialogRef={dialogRef}
        label={`${title} screenshot`}
        onClose={() => setSelectedImage(null)}
        className="fixed inset-0 m-auto h-[90dvh] max-h-none w-[95vw] max-w-7xl bg-transparent p-0 backdrop:bg-black/90"
      >
        {selectedImage && (
          <div className="relative h-full w-full">
            <Image
              src={selectedImage}
              alt={`Enlarged ${title} screenshot`}
              fill
              className="object-contain"
              sizes="95vw"
            />
          </div>
        )}
      </Dialog>
    </>
  );
}
