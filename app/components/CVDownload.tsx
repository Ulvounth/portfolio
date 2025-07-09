"use client";

import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function CVDownload() {
  const handleDownload = () => {
    // You can replace this with your actual CV file path
    const cvUrl = "/cv/Andreas_Ulvund_CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Andreas_Ulvund_CV.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-full hover:bg-secondaryDark transition-colors shadow-md w-max"
    >
      <DocumentArrowDownIcon className="h-5 w-5" />
      <span>Download CV</span>
    </button>
  );
}
