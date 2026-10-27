import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { site } from "@/data/site";

export default function CVDownload() {
  return (
    <a
      href={site.cv}
      download
      className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-full hover:bg-secondaryDark transition-colors"
      aria-label={`Download ${site.name}'s CV as a PDF`}
    >
      <DocumentArrowDownIcon className="h-5 w-5" aria-hidden="true" />
      Download CV
    </a>
  );
}
