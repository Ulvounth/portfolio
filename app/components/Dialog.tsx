"use client";

import type { ReactNode, RefObject } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  label: string;
  children: ReactNode;
  className: string;
  onClose?: () => void;
}

// Native dialogs provide focus trapping, Escape handling and focus restoration.
export default function Dialog({
  dialogRef,
  label,
  children,
  className,
  onClose,
}: DialogProps) {
  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      className={className}
      onClose={onClose}
      onClick={(event) => {
        // Backdrop clicks target the dialog itself, as do clicks on its padding,
        // so only close when the pointer is outside the dialog box.
        if (event.target !== event.currentTarget) return;
        const { left, right, top, bottom } =
          event.currentTarget.getBoundingClientRect();
        const inside =
          event.clientX >= left &&
          event.clientX <= right &&
          event.clientY >= top &&
          event.clientY <= bottom;
        if (!inside) dialogRef.current?.close();
      }}
    >
      {children}
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label={`Close ${label}`}
        className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 text-gray-900 hover:bg-gray-200"
      >
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </dialog>
  );
}
